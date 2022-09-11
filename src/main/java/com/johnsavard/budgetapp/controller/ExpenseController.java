package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.ExpenseRepository;
import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/expense")
public class ExpenseController {

    private FolderRepository folderRepository;
    private ExpenseRepository expenseRepository;

    public ExpenseController(FolderRepository folderRepository, ExpenseRepository expenseRepository){
        this.folderRepository = folderRepository;
        this.expenseRepository = expenseRepository;
    }

    /**
     *
     * @param folderId - Passed in path variable, contains the folder id to be updated
     * @param expense - Expense object to be saved
     * @return
     */
    @PostMapping()
    public ModelAndView addExpense(@RequestParam("folderId") int folderId, @ModelAttribute("expense") Expense expense){
        Optional<Folder> folder = folderRepository.findById(folderId);

        folder.ifPresent(theFolder -> {
            expense.setFolder(theFolder);
        });

        expenseRepository.save(expense);

        return new ModelAndView("redirect:/folder/showFormForTransactions?folderId=" + folderId);
    }

    @GetMapping("/delete")
    public ModelAndView deleteExpense(
            @RequestParam("expenseId") int expenseId,
            @RequestParam("folderId") int folderId
            ){
        expenseRepository.deleteById(expenseId);

        return new ModelAndView("redirect:/folder/showFormForTransactions?folderId=" + folderId);
    }
    @GetMapping("/update")
    public String updateExpense(
            @RequestParam("expenseId") int expenseId,
            @RequestParam("folderId") int folderId,
            Model theModel
            ){
        Optional<Expense> expense = expenseRepository.findById(expenseId);

        theModel.addAttribute("expense", expense);
        theModel.addAttribute("folderId", folderId);

        return "expense-form-add.html";

    }


}
