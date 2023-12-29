package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.Folder;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Integer> {
  public List<Folder> findAllByOrderByName();

  public Folder findByNameAndMonthYearPeriod(String name, Date monthYearPeriod);

  public List<Folder> findAllByMonthYearPeriod(Date monthYearPeriod);
}
