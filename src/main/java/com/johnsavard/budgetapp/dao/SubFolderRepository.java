package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.SubFolder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubFolderRepository extends JpaRepository<SubFolder, Integer> {
  List<SubFolder> findByFolderId(Integer folderId);

  void deleteByFolderId(Integer folderId);
}
