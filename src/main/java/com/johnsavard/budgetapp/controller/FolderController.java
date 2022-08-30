package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
public class FolderController {

    @Autowired
    FolderRepository folderRepository;


    @GetMapping("/folder")
    public List<Folder> getAllFolders(){
        return folderRepository.findAll();
    }

    @GetMapping("/folder/{folderId}")
    public Optional<Folder> getFolderById(@PathVariable Integer folderId){
        return folderRepository.findById(folderId);
    }

    @PostMapping("/folder")
    public String createFolder(@ModelAttribute("folder") Folder folder){
        folderRepository.save(folder);

        return "redirect:/";
    }

    @PutMapping("/folder/{folderId}")
    public Folder updateFolder(@PathVariable Integer folderId, @Valid @RequestBody Folder folderRequest){
        return folderRepository.findById(folderId).map(folder -> {
            folder.setName(folderRequest.getName());
            folder.setBalance(folderRequest.getBalance());
            folder.setAmount(folderRequest.getAmount());
            return folderRepository.save(folder);
        }).orElseThrow(() -> new ResourceNotFoundException("FolderId " + folderId + " not found"));
    }

    @DeleteMapping("/folder/{folderId}")
    public ResponseEntity<?> deleteFolder(@PathVariable Integer folderId){
        return folderRepository.findById(folderId).map(folder ->{
            folderRepository.delete(folder);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("FolderId " + folderId + " not found"));
    }

}
