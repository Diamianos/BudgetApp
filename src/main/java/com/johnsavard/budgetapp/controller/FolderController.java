package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.ExpenseRepository;
import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Controller
public class FolderController {

    @Autowired
    FolderRepository folderRepository;

    @Autowired
    ExpenseRepository expenseRepository;


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

        System.out.println("Folder: " + folder.toString());

        folderRepository.save(folder);

        return "redirect:/";
    }

    @GetMapping("/folder/showFormForUpdate")
    public String updateFolder(@RequestParam("folderId") int folderId, Model theModel){

        Optional<Folder> theFolder = folderRepository.findById(folderId);

        theModel.addAttribute("folder", theFolder);

        return "folder-form-add.html";
    }

    @GetMapping("/folder/delete")
    public String deleteFolder(@RequestParam("folderId") int folderId){

        // First deleting the expenses related to the folder
        List<Expense> expenses = expenseRepository.findByFolderId(folderId);
        expenses.stream()
                .forEach(item -> {
                    expenseRepository.deleteById(item.getId());
                });

        // Deleting the folder
        folderRepository.deleteById(folderId);

        return "redirect:/";
    }

}
