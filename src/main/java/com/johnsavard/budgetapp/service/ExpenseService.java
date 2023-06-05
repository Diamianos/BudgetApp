package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.dao.ExpenseRepository;
import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {

  private ExpenseRepository expenseRepository;
  private FolderRepository folderRepository;

  public ExpenseService(
    ExpenseRepository expenseRepository,
    FolderRepository folderRepository
  ) {
    this.expenseRepository = expenseRepository;
    this.folderRepository = folderRepository;
  }

  public List<Expense> findAllExpenses() {
    return expenseRepository.findAll();
  }

  public Optional<Expense> findExpenseById(int expenseId) {
    return expenseRepository.findById(expenseId);
  }

  public void saveExpense(int folderId, Expense expense) {
    expenseRepository.save(expense);

    // Update folder to reflect the new balance
    Optional<Folder> tempFolder = folderRepository.findById(folderId);
    tempFolder.ifPresent(folder -> {
      BigDecimal newBalance = folder.getBalance().subtract(expense.getAmount());
      folder.setBalance(newBalance);
      folderRepository.save(folder);
    });
  }

  public void deleteExpense(int expenseId, int folderId) {
    Optional<Expense> tempExpense = expenseRepository.findById(expenseId);
    Optional<Folder> tempFolder = folderRepository.findById(folderId);

    // Update folder to add back the balance of the expense
    tempFolder.ifPresent(folder -> {
      Expense theExpense = tempExpense.get();
      folder.setBalance(folder.getBalance().add(theExpense.getAmount()));
    });

    expenseRepository.deleteById(expenseId);
  }
}
