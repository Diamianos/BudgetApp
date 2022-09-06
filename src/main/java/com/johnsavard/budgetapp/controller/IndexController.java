package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class IndexController {

    @Autowired
    private FolderRepository folderRepository;

    /**
     *
     * @param theModel - Used for getting all folders to be displayed
     * @return - the index page to be displayed in string format.
     */
    @GetMapping("/")
    public String showIndexPage(Model theModel){
        theModel.addAttribute("folders", folderRepository.findAll());
        return "index";
    }

    /**
     *
     * @param theModel - for binding the folder data
     * @return The html page to display
     */
    @GetMapping("/showFormForFolderAdd")
    public String showFormForAdd(Model theModel){

        // Create model attribute to bind form data
        Folder theFolder = new Folder();

        theModel.addAttribute("folder", theFolder);

        return "folder-form-add";

    }
}
