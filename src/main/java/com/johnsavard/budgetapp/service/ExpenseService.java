package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.dao.ExpenseRepository;
import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.dao.SubFolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.entity.SubFolder;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {

  private ExpenseRepository expenseRepository;
  private SubFolderRepository subFolderRepository;

  public ExpenseService(
    ExpenseRepository expenseRepository,
    SubFolderRepository subFolderRepository
  ) {
    this.expenseRepository = expenseRepository;
    this.subFolderRepository = subFolderRepository;
  }

  public List<Expense> findAllExpenses() {
    return expenseRepository.findAll();
  }

  public Optional<Expense> findExpenseById(int expenseId) {
    return expenseRepository.findById(expenseId);
  }

  public ResponseEntity<String> saveExpense(
    SubFolder subFolder,
    Expense expense
  ) throws URISyntaxException {
    // Verify the subfolder amount is greater than the expense
    if (subFolder.getBalance().compareTo(expense.getAmount()) >= 0) {
      // Minus the expense from the subFolder
      subFolder.setBalance(
        subFolder.getBalance().subtract(expense.getAmount())
      );
      // Save the subfolder and expense
      subFolderRepository.save(subFolder);
      expense.setSubFolder(subFolder);
      Expense savedExpense = expenseRepository.save(expense);

      return ResponseEntity
        .created(new URI("/expense/" + savedExpense.getId()))
        .body(savedExpense.toString());
    } else {
      return ResponseEntity
        .badRequest()
        .body(
          "Expense cannot be greater than sub folder amount. Unable to save expense"
        );
    }
  }

  public void deleteExpense(int expenseId, int folderId) {
    Optional<Expense> tempExpense = expenseRepository.findById(expenseId);
    // Optional<Folder> tempFolder = folderRepository.findById(folderId);

    // // Update folder to add back the balance of the expense
    // tempFolder.ifPresent(folder -> {
    //   Expense theExpense = tempExpense.get();
    //   folder.setBalance(folder.getBalance().add(theExpense.getAmount()));
    // });

    // expenseRepository.deleteById(expenseId);
  }
}
