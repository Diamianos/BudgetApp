package com.johnsavard.budgetapp.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.johnsavard.budgetapp.dao.ExpenseRepository;
import com.johnsavard.budgetapp.dao.SubFolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.SubFolder;
import com.johnsavard.budgetapp.exception.InvalidExpenseValueException;
import com.johnsavard.budgetapp.exception.NoRecordFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {

  private ExpenseRepository expenseRepository;
  private SubFolderRepository subFolderRepository;
  private final ObjectMapper objectMapper;

  public ExpenseService(
    ExpenseRepository expenseRepository,
    SubFolderRepository subFolderRepository,
    ObjectMapper objectMapper
  ) {
    this.expenseRepository = expenseRepository;
    this.subFolderRepository = subFolderRepository;
    this.objectMapper = objectMapper;
    objectMapper.configure(
      DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
      true
    );
  }

  public List<Expense> findAllExpenses() {
    return expenseRepository.findAll();
  }

  public Optional<Expense> findExpenseById(int expenseId) {
    return expenseRepository.findById(expenseId);
  }

  public List<Expense> findExpensesBySubFolderId(int folderId) {
    return expenseRepository.findBySubFolderId(folderId);
  }

  public Expense saveExpense(SubFolder subFolder, Expense expense)
    throws URISyntaxException {
    // Verify the subfolder amount is greater than the expense
    if (subFolder.getBalance().compareTo(expense.getAmount()) >= 0) {
      // Minus the expense from the subFolder
      subFolder.setBalance(
        subFolder.getBalance().subtract(expense.getAmount())
      );
      // Save the subfolder and expense
      subFolderRepository.save(subFolder);
      expense.setSubFolder(subFolder);
      return expenseRepository.save(expense);
    } else {
      throw new InvalidExpenseValueException(
        String.format(
          "Expense value %s is greater than sub folder balance of %s",
          expense.getAmount().stripTrailingZeros().toPlainString(),
          subFolder.getBalance().stripTrailingZeros().toPlainString()
        )
      );
    }
  }

  public ResponseEntity<String> patchExpense(
    SubFolder subFolder,
    Expense expense,
    String json
  ) throws IOException {
    // Converting json to expense object
    try {
      Expense patch = objectMapper.readValue(json, Expense.class);
      return handlePatchingExpense(expense, patch, subFolder);
    } catch (JsonProcessingException e) {
      return ResponseEntity
        .badRequest()
        .body(
          String.format(
            "Json did not match expense object format. Please check passed in fields: %s \n %s",
            json,
            e.toString()
          )
        );
    }
  }

  public void deleteExpense(int expenseId) {
    Optional<Expense> existingExpense = expenseRepository.findById(expenseId);

    if (existingExpense.isPresent()) {
      Expense exp = existingExpense.get();
      SubFolder existingSubFolder = subFolderRepository
        .findById(exp.getSubFolder().getId())
        .get();
      existingSubFolder.setBalance(
        existingSubFolder.getBalance().add(exp.getAmount())
      );
      expenseRepository.delete(exp);
      subFolderRepository.save(existingSubFolder);
    } else {
      throw new NoRecordFoundException();
    }
  }

  private ResponseEntity<String> handlePatchingExpense(
    Expense existing,
    Expense patch,
    SubFolder subFolder
  ) {
    // Need to check if amount field in expense is being updated
    if (
      patch.getAmount() != null &&
      patch.getAmount().compareTo(new BigDecimal(0)) == 1
    ) {
      // Determine new sub folder balance after adding existing expense
      BigDecimal newSubFolderBalance = subFolder
        .getBalance()
        .add(existing.getAmount());
      // Verify new expense will not be greater than subfolder balance
      if (patch.getAmount().compareTo(newSubFolderBalance) == 1) {
        // return error stating expense amount cannot be greater than sub folder balance
        return ResponseEntity
          .badRequest()
          .body(
            "Expense cannot be greater than sub folder amount. Unable to update expense."
          );
      } else {
        // Save subFolder with updated balance amount and expense
        existing.setAmount(patch.getAmount());
        subFolder.setBalance(newSubFolderBalance.subtract(patch.getAmount()));
        subFolderRepository.save(subFolder);
      }
    }

    // Updating description if value is present
    if (patch.getDescription() != null) {
      existing.setDescription(patch.getDescription());
    }
    // Updating merchant if value is present
    if (patch.getMerchant() != null) {
      existing.setMerchant(patch.getMerchant());
    }
    // Updating dateOfTransaction if value is present
    if (patch.getDateOfTransaction() != null) {
      existing.setDateOfTransaction(patch.getDateOfTransaction());
    }

    // Save the updated expense
    Expense updatedExpense = expenseRepository.save(existing);
    return ResponseEntity.ok().body(updatedExpense.toString());
  }
}
