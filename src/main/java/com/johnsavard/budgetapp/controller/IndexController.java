package com.johnsavard.budgetapp.controller;

import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.dao.TimePeriodRepository;
import com.johnsavard.budgetapp.entity.Expense;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.entity.TimePeriod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Year;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;

@Controller
public class IndexController {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private TimePeriodRepository timePeriodRepository;

    /**
     *
     * @param theModel - Used for getting all folders to be displayed
     * @return - the index page to be displayed in string format.
     */
    @GetMapping("/")
    public String showIndexPage(Model theModel){

        // Retrieving the date for displaying to html page and creating time period if necessary
        YearMonth thisMonth = YearMonth.now();
        DateTimeFormatter monthYearFormatter = DateTimeFormatter.ofPattern("MMMM yyyy");
        String date = thisMonth.format(monthYearFormatter);

        // Checking if first time loading page, saving time period if so adding to DB
        String[] dateSplit = date.split(" ", 2);
        TimePeriod timePeriod = timePeriodRepository.findByMonthAndYear(dateSplit[0], Integer.parseInt(dateSplit[1]));
        if (timePeriod == null){
            timePeriod = new TimePeriod(dateSplit[0], Integer.parseInt(dateSplit[1]));
            timePeriodRepository.save(timePeriod);
            System.out.println("Saving new time period" + timePeriod);
        }

        // Adding the model attributes
        theModel.addAttribute("folders", folderRepository.findAllByTimePeriod(timePeriod));
        theModel.addAttribute("date", date);
        return "index";
    }

    @GetMapping(value={"/previousMonth", "/nextMonth"})
    public String showPreviousMonth(@RequestParam("date")String date, @RequestParam("previous")boolean previous, Model theModel){

        // Adding or subtracting a month based on passed in request param
        DateTimeFormatter monthYearFormatter = DateTimeFormatter.ofPattern("MMMM yyyy");
        YearMonth yearMonth = YearMonth.parse(date, monthYearFormatter);
        if (previous){
            yearMonth = yearMonth.minusMonths(1);
        } else {
            yearMonth = yearMonth.plusMonths(1);
        }

        String newDate = yearMonth.format(monthYearFormatter);

        // Checking if first time loading page, saving time period if so adding to DB
        String[] dateSplit = newDate.split(" ", 2);
        TimePeriod timePeriod = timePeriodRepository.findByMonthAndYear(dateSplit[0], Integer.parseInt(dateSplit[1]));
        if (timePeriod == null){
            timePeriod = new TimePeriod(dateSplit[0], Integer.parseInt(dateSplit[1]));
            timePeriodRepository.save(timePeriod);
            System.out.println("Saving new time period" + timePeriod);
        }

        // Adding the model attributes
        theModel.addAttribute("folders", folderRepository.findAllByTimePeriod(timePeriod));
        theModel.addAttribute("date", newDate);
        return "index";
    }

    /**
     *
     * @param date - the month and year associated with the folder
     * @param theModel - for binding the folder data
     * @return The html page to display
     */
    @GetMapping("/showFormForFolderAdd")
    public String showFormForAdd(@RequestParam("date")String date, Model theModel){

        // Create model attribute to bind form data
        Folder theFolder = new Folder();

        // Bind the timePeriod to the folder
        String[] dateSplit = date.split(" ", 2);
        TimePeriod existingTimePeriod = timePeriodRepository.findByMonthAndYear(dateSplit[0], Integer.parseInt(dateSplit[1]));
        if (existingTimePeriod == null){
            TimePeriod period = new TimePeriod(dateSplit[0], Integer.parseInt(dateSplit[1]));
            timePeriodRepository.save(period);
            System.out.println("Saving new time period" + period);
            theFolder.setTimePeriod(period);
        } else {
            System.out.println("Time Period found: " + existingTimePeriod);
            theFolder.setTimePeriod(existingTimePeriod);
        }

        theModel.addAttribute("folder", theFolder);
        theModel.addAttribute("date", date);

        return "folder-form-add";
    }

    /**
     *
     * @param theModel - Used for binding the expense data
     * @return String for the correct view
     */
    @GetMapping("/showFormForExpenseAdd")
    public String showFormForExpenseAdd(@RequestParam("folderId") int folderId, Model theModel){
        Expense expense = new Expense();

        theModel.addAttribute("expense", expense);
        theModel.addAttribute("folderId", folderId);

        return "expense-form-add";
    }
}
