package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.dao.ExpenseRepository;
import com.johnsavard.budgetapp.entity.Expense;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    private ExpenseRepository expenseRepository;

    public ExpenseService(ExpenseRepository expenseRepository){
        this.expenseRepository = expenseRepository;
    }

    public Optional<Expense> findExpenseById(int expenseId){
        return expenseRepository.findById(expenseId);
    }

    public List<Expense> findExpensesByFolderId(int folderId){
        return expenseRepository.findByFolderId(folderId);
    }

    public void saveExpense(Expense expense){
        expenseRepository.save(expense);
    }

    public void deleteExpense(int expenseId){
        expenseRepository.deleteById(expenseId);
    }
}
