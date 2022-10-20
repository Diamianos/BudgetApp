package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.TimePeriodRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.entity.TimePeriod;
import com.johnsavard.budgetapp.service.ExpenseService;
import com.johnsavard.budgetapp.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/folder")
public class FolderController {


    private final FolderService folderService;
    private final ExpenseService expenseService;

    /**
     *
     * @param folderService - Injected property
     * @param expenseService - Injected property
     */
    public FolderController(FolderService folderService, ExpenseService expenseService){
        this.folderService = folderService;
        this.expenseService = expenseService;
    };


    /**
     * Returns all folders that are located in the repo.
     *
     * @return List of Folder Objects
     */
    @GetMapping()
    public List<Folder> getAllFolders(){
        return folderService.findAllFolders();
    }

    /**
     *
     * @param folderId - Passed in with path variable annotation.
     * @return Folder wrapped in an Optional object.
     */
    @GetMapping("/{folderId}")
    public Optional<Folder> getFolderById(@PathVariable Integer folderId){
        return folderService.findFolderById(folderId);
    }

    /**
     *
     * @param folder - Model attribute with data for a new folder.
     * @return the template to be displayed in string format.
     */
    @PostMapping()
    public String createFolder(@ModelAttribute("folder") Folder folder, Model theModel){

        folderService.saveFolder(folder);

        TimePeriod timePeriod = folder.getTimePeriod();

        // Adding the model attributes
        theModel.addAttribute("folders", folderService.findAllByTimePeriod(timePeriod));
        theModel.addAttribute("date", timePeriod.monthAndYearToString());


        return "index";
    }

    /**
     *
     * @param folderId - Determines which folder to be updated.
     * @param theModel - Used for passing form information to the folder-form-add html page
     * @return
     */
    @GetMapping("/showFormForUpdate")
    public String updateFolder(@RequestParam("folderId") int folderId, Model theModel){

        Optional<Folder> theFolder = folderService.findFolderById(folderId);

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
        List<Expense> expenses = expenseService.findExpensesByFolderId(folderId);
        expenses.stream()
                .forEach(item -> {
                    expenseService.deleteExpense(item.getId(), folderId);
                });

        // Deleting the folder
        folderService.deleteFolder(folderId);

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
        Optional<Folder> folder = folderService.findFolderById(folderId);
        List<Expense> expenses = expenseService.findExpensesByFolderId(folderId);

        // Adding expenses to the model
        folder.ifPresent(theFolder -> {
            theModel.addAttribute("folder", theFolder);
        });
        theModel.addAttribute("expenses", expenses);

        // Redirecting to the correct page
        return "transactions";
    }

}
