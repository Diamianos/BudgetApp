package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.controller.FolderController;
import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Folder;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class FolderService {

  Logger log = LoggerFactory.getLogger(FolderService.class);

  private FolderRepository folderRepository;

  public FolderService(FolderRepository folderRepository) {
    this.folderRepository = folderRepository;
  }

  public List<Folder> findAllFolders() {
    return folderRepository.findAllByOrderByName();
  }

  public Folder findFolderByNameAndMonthYearPeriod(
    String folderName,
    Date monthYearPeriod
  ) {
    return folderRepository.findByNameAndMonthYearPeriod(
      folderName,
      monthYearPeriod
    );
  }

  public Optional<Folder> findFolderById(int folderId) {
    return folderRepository.findById(folderId);
  }

  public Folder saveFolder(Folder folder) {
    if (folder.getId() == 0) {
      folder.setBalance(folder.getAmount());
    }
    return folderRepository.save(folder);
  }

  public void saveFolders(List<Folder> folders) {
    for (Folder f : folders) {
      if (f.getId() == 0) {
        f.setBalance(f.getAmount());
      }
      log.info("saveFolders() - Sending folder to database [{}]", f);
      folderRepository.save(f);
    }
  }

  public void deleteFolder(int folderId) {
    folderRepository.deleteById(folderId);
  }

  public List<Folder> findAllByMonthYearPeriod(Date monthYearPeriod) {
    return folderRepository.findAllByMonthYearPeriod(monthYearPeriod);
  }
}
