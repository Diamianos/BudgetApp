package com.johnsavard.budgetapp.entity;

import java.io.Serializable;

public class Tags implements Serializable {

  private int bill;
  private int takeOut;
  private int leave;
  private int transfer;

  public Tags() {
    this.bill = 0;
    this.takeOut = 0;
    this.leave = 0;
    this.transfer = 0;
  }

  public Tags(int bill, int takeOut, int leave, int transfer) {
    this.bill = bill;
    this.takeOut = takeOut;
    this.leave = leave;
    this.transfer = transfer;
  }

  public int getBill() {
    return bill;
  }

  public void setBill(int bill) {
    this.bill = bill;
  }

  public int getTakeOut() {
    return takeOut;
  }

  public void setTakeOut(int takeOut) {
    this.takeOut = takeOut;
  }

  public int getLeave() {
    return leave;
  }

  public void setLeave(int leave) {
    this.leave = leave;
  }

  public int getTransfer() {
    return transfer;
  }

  public void setTransfer(int transfer) {
    this.transfer = transfer;
  }
}
