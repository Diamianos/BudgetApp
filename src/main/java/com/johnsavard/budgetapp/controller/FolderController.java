package com.johnsavard.budgetapp.controller;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.service.FolderService;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/folder")
public class FolderController {

  private final FolderService folderService;

  /**
   *
   * @param folderService - Injected property
   * @param expenseService - Injected property
   */
  public FolderController(FolderService folderService) {
    this.folderService = folderService;
  }

  /**
   * Returns all folders that are located in the repo.
   *
   * @return List of Folder Objects
   */
  @RequestMapping(method = RequestMethod.GET, produces = { "application/json" })
  public List<Folder> getAllFolders() {
    System.out.println("\n\n\n\n");
    System.out.println("getAll");
    return folderService.findAllFolders();
  }

  /**
   *
   * @param folderId - Passed in with path variable annotation.
   * @return Folder wrapped in an Optional object.
   */
  @RequestMapping(
    path = "/getById/{folderId}",
    method = RequestMethod.GET,
    produces = { "application/json" }
  )
  public Optional<Folder> getFolderById(@PathVariable Integer folderId) {
    return folderService.findFolderById(folderId);
  }

  /**
   *
   * @param folder - Model attribute with data for a new folder.
   * @return Response entity of the newly created folder
   */
  @RequestMapping(
    method = RequestMethod.POST,
    produces = { "application/json" },
    consumes = { "application/json" }
  )
  public ResponseEntity<Folder> createFolder(@RequestBody Folder folder)
    throws URISyntaxException {
    Folder savedFolder = folderService.saveFolder(folder);

    return ResponseEntity
      .created(new URI("/folder/" + savedFolder.getId()))
      .body(savedFolder);
  }

  /**
   *
   * @param id - Id of the folder to be updated
   * @param folder - Request body with the new values for the folder
   * @return - ResponseEntity of the result of saving the folder
   * @throws Exception
   */
  @RequestMapping(
    path = "/{id}",
    method = RequestMethod.PATCH,
    produces = { "application/json" },
    consumes = { "application/json" }
  )
  public ResponseEntity<Folder> updateFolder(
    @PathVariable Integer id,
    @RequestBody Folder folder
  ) throws Exception {
    Optional<Folder> currentFolder = folderService.findFolderById(id);
    currentFolder.ifPresent(f -> {
      f.setName(folder.getName());
      f.setAmount(folder.getAmount());
      f.setBalance(folder.getBalance());
    });
    return ResponseEntity.ok(folderService.saveFolder(currentFolder.get()));
  }

  /**
   *
   * @param id - Id of the folder to be deleted
   * @return - Response entity with an "ok" build
   */
  @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<String> deleteFolder(@PathVariable Integer id) {
    folderService.deleteFolder(id);
    return ResponseEntity.ok().build();
  }

  /**
   *
   * @param monthYearPeriod - String format of "YYYY-MM-DD"
   * @return - List of Folders
   */
  @RequestMapping(
    path = "/date",
    method = RequestMethod.GET,
    produces = { "application/json" }
  )
  public List<Folder> getAllFoldersByMonthYearPeriod(
    @RequestParam("monthYearPeriod") @DateTimeFormat(
      iso = DateTimeFormat.ISO.DATE
    ) Date monthYearPeriod
  ) {
    return folderService.findAllByMonthYearPeriod(monthYearPeriod);
  }
}
