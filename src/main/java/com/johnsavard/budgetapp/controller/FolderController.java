package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.service.FolderService;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/folder")
public class FolderController {

  Logger log = LoggerFactory.getLogger(FolderController.class);

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
    log.info("getAllFolders() - Retrieving all folders.");
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
    log.info("getFolderById() - Retrieving folder with ID [{}]", folderId);
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
    log.info("createFolder() - Saving folder: {}", folder);
    Folder savedFolder = folderService.saveFolder(folder);
    log.info(
      "createFolder() - Returning newly created folder: {}",
      savedFolder
    );

    return ResponseEntity
      .created(new URI("/folder/" + savedFolder.getId()))
      .body(savedFolder);
  }

  /***
   *
   * @param folders - List of folders to be saved to the database
   * @return - 200 response
   */
  @RequestMapping(
    method = RequestMethod.POST,
    path = "/folders",
    produces = { "application/json" },
    consumes = { "application/json" }
  )
  public ResponseEntity<String> createFolders(
    @RequestBody List<Folder> folders
  ) {
    log.info(
      "createFolders() - Added list of folders to database: {}",
      folders
    );
    folderService.saveFolders(folders);
    return ResponseEntity.ok("Folders successfully created");
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
    log.info(
      "updateFolder() - Updating folder with ID [{}] with folder: {}",
      id,
      folder
    );

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
    log.info("deleteFolder() - Removing folder with ID [{}]", id);
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
