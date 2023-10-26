package com.johnsavard.budgetapp.exception;

public class InvalidExpenseValueException extends RuntimeException {

  public InvalidExpenseValueException(String errorMessage) {
    super(errorMessage);
  }
}
