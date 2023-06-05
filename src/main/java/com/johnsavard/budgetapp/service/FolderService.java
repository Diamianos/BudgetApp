package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Folder;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class FolderService {

  private FolderRepository folderRepository;

  public FolderService(FolderRepository folderRepository) {
    this.folderRepository = folderRepository;
  }

  public List<Folder> findAllFolders() {
    return folderRepository.findAllByOrderByName();
  }

  public Folder findFolderByName(String folderName) {
    return folderRepository.findByName(folderName);
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

  public void deleteFolder(int folderId) {
    folderRepository.deleteById(folderId);
  }
}
