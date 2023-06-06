package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.SubFolder;
import com.johnsavard.budgetapp.service.ExpenseService;
import com.johnsavard.budgetapp.service.SubFolderService;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

  private final ExpenseService expenseService;
  private final SubFolderService subFolderService;

  public ExpenseController(
    ExpenseService expenseService,
    SubFolderService subFolderService
  ) {
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
   * @param expenseId - The expense to be returned
   * @return - All expenses in the database
   */
  @GetMapping("/{expenseId}")
  public Optional<Expense> getExpenseById(@PathVariable Integer expenseId) {
    return expenseService.findExpenseById(expenseId);
  }

  /**
   *
   * @param subFolderId - The subfolder to which attribute this expense to
   * @param expense - Expense object to be saved
   * @return
   * @throws URISyntaxException
   */
  @PostMapping
  public ResponseEntity<String> addExpense(
    @RequestParam("subFolderId") int subFolderId,
    @RequestBody Expense expense
  ) throws URISyntaxException {
    Optional<SubFolder> subFolder = subFolderService.findSubFolderById(
      subFolderId
    );

    if (subFolder.isPresent()) {
      return expenseService.saveExpense(subFolder.get(), expense);
    } else {
      return ResponseEntity
        .badRequest()
        .body(
          String.format(
            "Error retrieving subFolder with ID %s. Unable to save expense.",
            subFolderId
          )
        );
    }
  }

  @PatchMapping
  public ResponseEntity<String> patchExpense(
    @RequestParam("subFolderId") int subFolderId,
    @RequestParam("expenseId") int expenseId,
    @RequestBody String json
  ) {
    Optional<SubFolder> subFolder = subFolderService.findSubFolderById(
      subFolderId
    );
    Optional<Expense> expense = expenseService.findExpenseById(expenseId);
    if (subFolder.isPresent() && expense.isPresent()) {
      return expenseService.patchExpense(subFolder.get(), expense.get(), json);
    } else {
      return ResponseEntity
        .badRequest()
        .body(
          String.format(
            "Error retrieving subFolder with ID %s or expense with ID %s. Unable to save expense.",
            subFolderId,
            expenseId
          )
        );
    }
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
}
