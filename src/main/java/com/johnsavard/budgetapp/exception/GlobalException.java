package com.johnsavard.budgetapp.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(CustomException.class)
    public ModelAndView processCustomException(CustomException ce){

        ModelAndView mav = new ModelAndView("error");
        mav.addObject("name", ce.getName());
        mav.addObject("message", ce.getMessage());

        return mav;
    }
}
