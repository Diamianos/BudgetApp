package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.SubFolder;
import com.johnsavard.budgetapp.exception.InvalidExpenseValueException;
import com.johnsavard.budgetapp.service.ExpenseService;
import com.johnsavard.budgetapp.service.SubFolderService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
  @RequestMapping(method = RequestMethod.GET, produces = { "application/json" })
  public List<Expense> getAllExpenses() {
    return expenseService.findAllExpenses();
  }

  /**
   * @param expenseId - The expense to be returned
   * @return - All expenses in the database
   */
  @RequestMapping(
    path = "/{expenseId}",
    method = RequestMethod.GET,
    produces = { "application/json" }
  )
  public Optional<Expense> getExpenseById(@PathVariable Integer expenseId) {
    return expenseService.findExpenseById(expenseId);
  }

  /**
   *
   * @param subFolderId - The subfolder to which attribute this expense to
   * @param expense - [Request Body] Expense object in json format to be saved
   * @return - Response Entity
   * @throws URISyntaxException
   */
  @RequestMapping(
    path = "/{subFolderId}",
    method = RequestMethod.POST,
    produces = { "application/json" },
    consumes = { "application/json" }
  )
  public ResponseEntity<Expense> addExpense(
    @PathVariable int subFolderId,
    @RequestBody Expense expense
  ) throws URISyntaxException {
    Optional<SubFolder> subFolder = subFolderService.findSubFolderById(
      subFolderId
    );

    try {
      if (subFolder.isPresent()) {
        Expense newExpense = expenseService.saveExpense(
          subFolder.get(),
          expense
        );
        return new ResponseEntity<>(newExpense, HttpStatus.OK);
      } else {
        throw new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          String.format(
            "Unable to add expense, subfolder with ID %d not found.",
            subFolderId
          )
        );
      }
    } catch (InvalidExpenseValueException ex) {
      throw new ResponseStatusException(
        HttpStatus.BAD_REQUEST,
        ex.getMessage()
      );
    }
  }

  /**
   *
   * @param subFolderId - The subfolder which the expense is attached to
   * @param expenseId - The expense to be patched
   * @param json - [Request Body] Json object containing the fields to be updated
   * @return - Response Entity
   * @throws IOException
   * @throws URISyntaxException
   */
  @RequestMapping(
    method = RequestMethod.PATCH,
    produces = { "application/json" },
    consumes = { "application/json" }
  )
  public ResponseEntity<String> patchExpense(
    @RequestParam("subFolderId") int subFolderId,
    @RequestParam("expenseId") int expenseId,
    @RequestBody String json
  ) throws IOException {
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
  @RequestMapping(path = "/{expenseId}", method = RequestMethod.DELETE)
  public void deleteExpense(@PathVariable Integer expenseId) {
    expenseService.deleteExpense(expenseId);
  }
}
