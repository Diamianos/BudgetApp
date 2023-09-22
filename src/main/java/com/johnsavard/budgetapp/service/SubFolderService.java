package com.johnsavard.budgetapp.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.johnsavard.budgetapp.dao.SubFolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.SubFolder;
import com.johnsavard.budgetapp.entity.Tags;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SubFolderService {

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
    List<Expense> testExpense = expenseService.findExpensesBySubFolderId(1);
    System.out.println(testExpense);
    // subFolders
    //   .stream()
    //   .forEach(f -> {
    //     List<Expense> expenses = expenseService.findExpensesBySubFolderId(
    //       f.getId()
    //     );
    //     f.setExpenses(expenses);
    //   });
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
    }
    return subFolderRepository.save(subFolder);
  }

  public ResponseEntity<String> patchSubFolder(
    SubFolder existingSubfolder,
    String json
  ) {
    // Converting json to expense object
    try {
      SubFolder patch = objectMapper.readValue(json, SubFolder.class);
      return handlePatchingSubfolder(existingSubfolder, patch);
    } catch (JsonProcessingException e) {
      return ResponseEntity
        .badRequest()
        .body(
          String.format(
            "Json did not match subfolder object format. Please check passed in fields: %s \n %s",
            json,
            e.toString()
          )
        );
    }
  }

  public void deleteSubFolder(int subFolderId) {
    subFolderRepository.deleteById(subFolderId);
  }

  private ResponseEntity<String> handlePatchingSubfolder(
    SubFolder existingSubfolder,
    SubFolder patch
  ) {
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
    }

    // Save the updated subFolder
    SubFolder updatedSubFolder = subFolderRepository.save(existingSubfolder);
    return ResponseEntity.ok().body(updatedSubFolder.toString());
  }
}
