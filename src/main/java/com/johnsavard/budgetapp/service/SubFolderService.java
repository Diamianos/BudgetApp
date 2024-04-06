package com.johnsavard.budgetapp.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.johnsavard.budgetapp.dao.SubFolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.SubFolder;
import com.johnsavard.budgetapp.entity.Tags;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SubFolderService {

  Logger log = LoggerFactory.getLogger(SubFolderService.class);

  private SubFolderRepository subFolderRepository;
  private ExpenseService expenseService;
  private final ObjectMapper objectMapper;

  public SubFolderService(
    SubFolderRepository subFolderRepository,
    ExpenseService expenseService,
    ObjectMapper objectMapper
  ) {
    this.subFolderRepository = subFolderRepository;
    this.expenseService = expenseService;
    this.objectMapper = objectMapper;
    objectMapper.configure(
      DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
      true
    );
  }

  public List<SubFolder> findAllSubFolders() {
    List<SubFolder> subFolders = subFolderRepository.findAll();
    subFolders
      .stream()
      .forEach(f -> {
        List<Expense> expenses = expenseService.findExpensesBySubFolderId(
          f.getId()
        );
        f.setExpenses(expenses);
      });

    return subFolders;
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
    System.out.println();
    if (subFolder.getTags() == null) {
      subFolder.setTags(new Tags(0, 0, 0, 0));
      subFolder.setTagsComplete(false);
    }
    return subFolderRepository.save(subFolder);
  }

  public SubFolder patchSubFolder(SubFolder existingSubfolder, String json)
    throws IOException {
    // Converting json to expense object
    SubFolder patch = objectMapper.readValue(json, SubFolder.class);
    return handlePatchingSubfolder(existingSubfolder, patch);
  }

  public void deleteSubFolder(int subFolderId) {
    subFolderRepository.deleteById(subFolderId);
  }

  public void deleteSubFolderByFolderId(int folderId) {}

  public List<SubFolder> findSubfoldersByFolderMonthYearPeriod(
    Date monthYearPeriod
  ) {
    List<SubFolder> subFolders = subFolderRepository.findAllByFolderMonthYearPeriod(
      monthYearPeriod
    );
    subFolders
      .stream()
      .forEach(f -> {
        List<Expense> expenses = expenseService.findExpensesBySubFolderId(
          f.getId()
        );
        f.setExpenses(expenses);
      });
    return subFolders;
  }

  private SubFolder handlePatchingSubfolder(
    SubFolder existingSubfolder,
    SubFolder patch
  ) {
    log.debug(
      "handlePatchingSubfolder() - updating existing subFolder [{}] with patch [{}]",
      existingSubfolder,
      patch
    );

    // Update fields that are needed
    if (patch.getName() != null) {
      existingSubfolder.setName(patch.getName());
    }
    if (patch.getAmount() != null) {
      existingSubfolder.setAmount(patch.getAmount());
    }
    if (patch.getBalance() != null) {
      existingSubfolder.setBalance(patch.getBalance());
    }
    if (patch.getDescription() != null) {
      existingSubfolder.setDescription(patch.getDescription());
    }
    if (patch.getMonthPeriod() != null) {
      existingSubfolder.setMonthPeriod(patch.getMonthPeriod());
    }
    if (patch.getTags() != null) {
      existingSubfolder.setTags(patch.getTags());
      existingSubfolder.setTagsComplete(patch.isTagsComplete());
    }

    // Save the updated subFolder
    log.debug(
      "handlePatchingSubfolder() - updating existing folder to database [{}]",
      existingSubfolder
    );
    SubFolder updatedSubFolder = subFolderRepository.save(existingSubfolder);
    return updatedSubFolder;
  }
}
