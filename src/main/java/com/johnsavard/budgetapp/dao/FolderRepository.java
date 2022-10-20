package com.johnsavard.budgetapp.dao;

import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.entity.TimePeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface FolderRepository extends JpaRepository<Folder, Integer> {

    List<Folder> findAllByTimePeriod(TimePeriod timePeriod);
}
