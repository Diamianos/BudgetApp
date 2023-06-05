package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.dao.SubFolderRepository;
import com.johnsavard.budgetapp.entity.SubFolder;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SubFolderService {

  private SubFolderRepository subFolderRepository;

  public SubFolderService(SubFolderRepository subFolderRepository) {
    this.subFolderRepository = subFolderRepository;
  }

  public List<SubFolder> findAllSubFolders() {
    return subFolderRepository.findAll();
  }

  public Optional<SubFolder> findSubFolderById(int subFolderId) {
    return subFolderRepository.findById(subFolderId);
  }

  public List<SubFolder> findSubFoldersByFolderId(int folderId) {
    return subFolderRepository.findByFolderId(folderId);
  }

  public SubFolder saveSubFolder(SubFolder subFolder) {
    if (subFolder.getId() == 0) {
      subFolder.setBalance(subFolder.getAmount());
    }
    return subFolderRepository.save(subFolder);
  }

  public void deleteSubFolder(int subFolderId) {
    subFolderRepository.deleteById(subFolderId);
  }
}
