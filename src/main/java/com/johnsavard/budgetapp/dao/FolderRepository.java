package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Integer> {

}
