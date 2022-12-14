package com.johnsavard.budgetapp.exception;

public class CustomException extends RuntimeException{

    String message;
    String name;

    public CustomException(String message, String name){
        this.message = message;
        this.name = name;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
