package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.TimePeriod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimePeriodRepository extends JpaRepository<TimePeriod, Integer> {

    TimePeriod findByMonthAndYear(String month, int year);

}
