package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByFolderId(Integer postId);
    Optional<Expense> findByIdAndFolderId(Integer id, Integer folderId);
}
