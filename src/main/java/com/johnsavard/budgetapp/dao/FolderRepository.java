package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.Folder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepository extends JpaRepository<Folder, Integer> {
  public List<Folder> findAllByOrderByName();

  public Folder findByName(String name);
}
