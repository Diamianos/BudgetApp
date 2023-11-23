package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.SubFolder;
import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SubFolderRepository extends JpaRepository<SubFolder, Integer> {
  List<SubFolder> findByFolderId(Integer folderId);

  void deleteByFolderId(Integer folderId);

  @Query(
    "SELECT sf FROM SubFolder sf INNER JOIN sf.folder f WHERE f.monthYearPeriod = :monthYearPeriod"
  )
  List<SubFolder> findAllByFolderMonthYearPeriod(
    @Param("monthYearPeriod") Date monthYearPeriod
  );
}
