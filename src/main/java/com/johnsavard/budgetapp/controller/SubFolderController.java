package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.entity.SubFolder;
import com.johnsavard.budgetapp.service.FolderService;
import com.johnsavard.budgetapp.service.SubFolderService;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subfolder")
public class SubFolderController {

  private final SubFolderService subFolderService;
  private final FolderService folderService;

  public SubFolderController(
    SubFolderService subFolderService,
    FolderService folderService
  ) {
    this.subFolderService = subFolderService;
    this.folderService = folderService;
  }

  @RequestMapping(method = RequestMethod.GET, produces = { "application/json" })
  public List<SubFolder> getAllSubFolders() {
    return subFolderService.findAllSubFolders();
  }

  @RequestMapping(
    path = "/{subFolderId}",
    method = RequestMethod.GET,
    produces = { "application/json" }
  )
  public Optional<SubFolder> getSubFolderById(
    @PathVariable Integer subFolderId
  ) {
    return subFolderService.findSubFolderById(subFolderId);
  }

  @RequestMapping(
    method = RequestMethod.POST,
    produces = { "application/json" },
    consumes = { "application/json" }
  )
  public ResponseEntity<SubFolder> createSubFolder(
    @RequestBody SubFolder subFolder
  ) throws URISyntaxException {
    Folder tempFolder = folderService.findFolderByName(subFolder.getName());

    subFolder.setFolder(tempFolder);

    SubFolder savedSubFolder = subFolderService.saveSubFolder(subFolder);

    return new ResponseEntity<SubFolder>(savedSubFolder, HttpStatus.CREATED);
  }

  @RequestMapping(
    path = "/{subFolderId}",
    method = RequestMethod.PATCH,
    produces = { "application/json" },
    consumes = { "application/json" }
  )
  public ResponseEntity<String> patchSubfolder(
    @PathVariable("subFolderId") int subFolderId,
    @RequestBody String json
  ) throws IOException {
    Optional<SubFolder> existingSubfolder = subFolderService.findSubFolderById(
      subFolderId
    );
    if (existingSubfolder.isPresent()) {
      return subFolderService.patchSubFolder(existingSubfolder.get(), json);
    } else {
      return ResponseEntity
        .badRequest()
        .body(
          String.format(
            "Error retrieving subFolder with ID %s. Unable to update sub folder.",
            subFolderId
          )
        );
    }
  }

  @RequestMapping(
    path = "/{subFolderId}",
    method = RequestMethod.DELETE,
    produces = { "application/json" }
  )
  public ResponseEntity<String> deleteSubFolder(
    @PathVariable Integer subFolderId
  ) {
    subFolderService.deleteSubFolder(subFolderId);
    return ResponseEntity.ok().build();
  }
}
