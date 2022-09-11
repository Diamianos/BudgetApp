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
@RequestMapping("/folder")
public class FolderController {


    private FolderRepository folderRepository;
    private ExpenseRepository expenseRepository;

    /**
     *
     * @param folderRepository - Injected property
     * @param expenseRepository - Injected property
     */
    public FolderController(FolderRepository folderRepository, ExpenseRepository expenseRepository){
        this.folderRepository = folderRepository;
        this.expenseRepository = expenseRepository;
    };


    /**
     * Returns all folders that are located in the repo.
     *
     * @return List of Folder Objects
     */
    @GetMapping()
    public List<Folder> getAllFolders(){
        return folderRepository.findAll();
    }

    /**
     *
     * @param folderId - Passed in with path variable annotation.
     * @return Folder wrapped in an Optional object.
     */
    @GetMapping("/{folderId}")
    public Optional<Folder> getFolderById(@PathVariable Integer folderId){
        return folderRepository.findById(folderId);
    }

    /**
     *
     * @param folder - Model attribute with data for a new folder.
     * @return the template to be displayed in string format.
     */
    @PostMapping()
    public String createFolder(@ModelAttribute("folder") Folder folder){

        System.out.println("Folder: " + folder.toString());

        folderRepository.save(folder);

        return "redirect:/";
    }

    /**
     *
     * @param folderId - Determines which folder to be updated.
     * @param theModel - Used for passing form information to the folder-form-add html page
     * @return
     */
    @GetMapping("/showFormForUpdate")
    public String updateFolder(@RequestParam("folderId") int folderId, Model theModel){

        Optional<Folder> theFolder = folderRepository.findById(folderId);

        theModel.addAttribute("folder", theFolder);

        return "folder-form-add.html";
    }

    /**
     *
     * @param folderId - The folder ID to be deleted.
     * @return a redirect to the homepage in string format.
     */
    @GetMapping("/delete")
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

    /**
     *
     * @param folderId - the folder associated to the expenses displayed
     * @param theModel - for attaching the expenses to be shown in the view
     * @return the string "transactions" for displaying the correct page
     */
    @GetMapping("/showFormForTransactions")
    public String showTransactions(@RequestParam("folderId") int folderId, Model theModel){
        // Getting all objects that need to be added to the model
        Optional<Folder> folder = folderRepository.findById(folderId);
        List<Expense> expenses = expenseRepository.findByFolderId(folderId);

        // Adding expenses to the model
        folder.ifPresent(theFolder -> {
            theModel.addAttribute("folder", theFolder);
        });
        theModel.addAttribute("expenses", expenses);
//        theModel.addAttribute("folderId", folderId);

        // Redirecting to the correct page
        return "transactions";
    }

}
