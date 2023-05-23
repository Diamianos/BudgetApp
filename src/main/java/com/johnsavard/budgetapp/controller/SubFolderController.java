package com.johnsavard.budgetapp.controller;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.entity.SubFolder;
import com.johnsavard.budgetapp.service.FolderService;
import com.johnsavard.budgetapp.service.SubFolderService;

@RestController
@RequestMapping("/subfolder")
public class SubFolderController {

    private final SubFolderService subFolderService;
    private final FolderService folderService;

    public SubFolderController(SubFolderService subFolderService, FolderService folderService){
        this.subFolderService = subFolderService;
        this.folderService = folderService;
    }

    @GetMapping()
    public List<SubFolder> getAllSubFolders(){
        return subFolderService.findAllSubFolders();
    }

    @GetMapping("/{subFolderId}")
    public Optional<SubFolder> getSubFolderById(@PathVariable Integer subFolderId){
        return subFolderService.findSubFolderById(subFolderId);
    }

    @PostMapping()
    public ResponseEntity<SubFolder> createSubFolder(@RequestBody SubFolder subFolder) throws URISyntaxException{

        Folder tempFolder = folderService.findFolderByName(subFolder.getName());

        subFolder.setFolder(tempFolder);

        SubFolder savedSubFolder = subFolderService.saveSubFolder(subFolder);

        return new ResponseEntity<SubFolder>(savedSubFolder, HttpStatus.CREATED);

    }

    @DeleteMapping("/{subFolderId}")
    public ResponseEntity<String> deleteSubFolder(@PathVariable Integer subFolderId){
        subFolderService.deleteSubFolder(subFolderId);
        return ResponseEntity.ok().build();
    }
    
}
