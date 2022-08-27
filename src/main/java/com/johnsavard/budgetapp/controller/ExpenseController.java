package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.ExpenseRepository;
import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;

@RestController
public class ExpenseController {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping("/folder/{folderId}/expenses")
    public List<Expense> getAllExpensesByFolderId(@PathVariable (value= "folderId") Integer folderId){
        return expenseRepository.findByFolderId(folderId);
    }

    @PostMapping("/folder/{folderId}/expenses")
    public Expense createExpense(@PathVariable(value="folderId") Integer folderId,
                                 @Valid @RequestBody Expense expense){
        return folderRepository.findById(folderId).map(folder -> {
            expense.setFolder(folder);
            return expenseRepository.save(expense);
        }).orElseThrow(() -> new ResourceNotFoundException("Folder Id " + folderId + " not found!"));
    }

    @PutMapping("/folder/{folderId}/expenses/{expenseId}")
    public Expense updateExpense(@PathVariable(value="folderId") Integer folderId,
                                 @PathVariable(value="expenseId") Integer expenseId,
                                 @Valid @RequestBody Expense theExpense){
        if (!folderRepository.existsById(folderId)){
            throw new ResourceNotFoundException("Folder Id " + folderId + " not found!");
        }

        return expenseRepository.findById(expenseId).map(expense -> {
            expense.setAmount(theExpense.getAmount());
            expense.setMerchant(theExpense.getMerchant());
            return expenseRepository.save(expense);
        }).orElseThrow(() -> new ResourceNotFoundException("Expense Id " + expenseId + " not found!"));
    }

    @DeleteMapping("/folder/{folderId}/expenses/{expenseId}")
    public ResponseEntity<?> deleteExpense(@PathVariable(value="folderId") Integer folderId,
                                           @PathVariable(value="expenseId") Integer expenseId){
        return expenseRepository.findByIdAndFolderId(expenseId, folderId).map(expense -> {
            expenseRepository.deleteById(expenseId);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Expense not found with expense id " + expenseId +
                                                            " and folder id " + folderId));
    }
}
