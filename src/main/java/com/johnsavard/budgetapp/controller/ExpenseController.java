package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.exception.CustomException;
import com.johnsavard.budgetapp.service.ExpenseService;
import com.johnsavard.budgetapp.service.FolderService;
import com.johnsavard.budgetapp.service.SubFolderService;
import java.util.List;
import java.util.Optional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

  private final FolderService folderService;
  private final ExpenseService expenseService;
  private final SubFolderService subFolderService;

  public ExpenseController(
    FolderService folderService,
    ExpenseService expenseService,
    SubFolderService subFolderService
  ) {
    this.folderService = folderService;
    this.expenseService = expenseService;
    this.subFolderService = subFolderService;
  }

  /**
   *
   * @return All expenses in the database
   */
  @GetMapping
  public List<Expense> getAllExpenses() {
    return expenseService.findAllExpenses();
  }

  /**
   *
   * @return All expenses in the database
   */
  @GetMapping("/{expenseId}")
  public Optional<Expense> getExpenseById(@PathVariable Integer expenseId) {
    return expenseService.findExpenseById(expenseId);
  }

  /**
   *
   * @param folderId - Passed in path variable, contains the folder id to be updated
   * @param expense - Expense object to be saved
   * @return
   */
  @PostMapping
  public void addExpense(
    @RequestParam("folderId") int folderId,
    @ModelAttribute("expense") Expense expense
  ) {
    Optional<Folder> folder = folderService.findFolderById(folderId);

    if (folder.get().getBalance().compareTo(expense.getAmount()) < 0) {}

    folder.ifPresent(theFolder -> {
      if (folder.get().getBalance().compareTo(expense.getAmount()) < 0) {
        throw new CustomException(
          "Custom Exception has occured",
          "CustomException"
        );
      }
      // expense.setFolder(theFolder);
    });

    expenseService.saveExpense(folderId, expense);
  }

  /**
   *
   * @param expenseId - Passed in from html page
   * @param folderId - Passed in from html page
   * @return The ModelAndView to be displayed
   */
  @GetMapping("/delete")
  public void deleteExpense(
    @RequestParam("expenseId") int expenseId,
    @RequestParam("folderId") int folderId
  ) {
    expenseService.deleteExpense(expenseId, folderId);
  }

  /**
   *
   * @param expenseId - Passed in from html page
   * @param folderId - Passed in from html page
   * @param theModel - Injected for adding attributes to html page
   * @return The view to be displayed
   */
  @GetMapping("/update")
  public void updateExpense(
    @RequestParam("expenseId") int expenseId,
    @RequestParam("folderId") int folderId,
    Model theModel
  ) {
    Optional<Expense> expense = expenseService.findExpenseById(expenseId);

    theModel.addAttribute("expense", expense);
    theModel.addAttribute("folderId", folderId);
  }
}
