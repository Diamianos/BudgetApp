package com.johnsavard.budgetapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.johnsavard.budgetapp.entity.SubFolder;

public interface SubFolderRepository extends JpaRepository<SubFolder, Integer>{
    List<SubFolder> findByFolderId(Integer folderId);
}
