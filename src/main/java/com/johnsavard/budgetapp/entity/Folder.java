package com.johnsavard.budgetapp.entity;

import javax.persistence.*;

@Entity
@Table(name="folder")
public class Folder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="amount")
    private double amount;

    @Column(name="balance")
    private double balance;

    public Folder(){}

    public Folder(String name, double amount) {
        this.name = name;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Override
    public String toString() {
        return "Folder{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", amount=" + amount +
                ", balance=" + balance +
                '}';
    }
}
