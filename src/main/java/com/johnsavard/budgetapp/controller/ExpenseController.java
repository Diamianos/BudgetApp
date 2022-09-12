package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.service.ExpenseService;
import com.johnsavard.budgetapp.service.FolderService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.Optional;

@Controller
@RequestMapping("/expense")
public class ExpenseController {

    private final FolderService folderService;
    private final ExpenseService expenseService;

    public ExpenseController(FolderService folderService, ExpenseService expenseService){
        this.folderService = folderService;
        this.expenseService = expenseService;
    }

    /**
     *
     * @param folderId - Passed in path variable, contains the folder id to be updated
     * @param expense - Expense object to be saved
     * @return
     */
    @PostMapping()
    public ModelAndView addExpense(@RequestParam("folderId") int folderId, @ModelAttribute("expense") Expense expense){
        Optional<Folder> folder = folderService.findFolderById(folderId);

        folder.ifPresent(theFolder -> {
            expense.setFolder(theFolder);
        });

        expenseService.saveExpense(folderId, expense);

        return new ModelAndView("redirect:/folder/showFormForTransactions?folderId=" + folderId);
    }

    /**
     *
     * @param expenseId - Passed in from html page
     * @param folderId - Passed in from html page
     * @return The ModelAndView to be displayed
     */
    @GetMapping("/delete")
    public ModelAndView deleteExpense(
            @RequestParam("expenseId") int expenseId,
            @RequestParam("folderId") int folderId
            ){
        expenseService.deleteExpense(expenseId, folderId);

        return new ModelAndView("redirect:/folder/showFormForTransactions?folderId=" + folderId);
    }

    /**
     *
     * @param expenseId - Passed in from html page
     * @param folderId - Passed in from html page
     * @param theModel - Injected for adding attributes to html page
     * @return The view to be displayed
     */
    @GetMapping("/update")
    public String updateExpense(
            @RequestParam("expenseId") int expenseId,
            @RequestParam("folderId") int folderId,
            Model theModel
            ){
        Optional<Expense> expense = expenseService.findExpenseById(expenseId);

        theModel.addAttribute("expense", expense);
        theModel.addAttribute("folderId", folderId);

        return "expense-form-add.html";

    }


}
