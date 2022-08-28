package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.FolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class IndexController {

    @Autowired
    private FolderRepository folderRepository;

    @GetMapping("/")
    public String showIndexPage(Model theModel){
        theModel.addAttribute("folders", folderRepository.findAll());
        return "index";
    }
}
