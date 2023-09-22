package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.Expense;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
  List<Expense> findBySubFolderId(Integer subFolderId);
}
