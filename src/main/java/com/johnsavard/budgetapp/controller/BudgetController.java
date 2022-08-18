package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.service.FolderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class BudgetController {

    private FolderService folderService;

    @Autowired
    public BudgetController(FolderService folderService) {
        this.folderService = folderService;
    }

    @GetMapping("/")
    public String index(Model theModel){
        List<Folder> folders = folderService.findAll();


        theModel.addAttribute("folders", folders);

        return "index";
    }
}
