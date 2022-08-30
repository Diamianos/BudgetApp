package com.johnsavard.budgetapp.entity;


import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Entity
@Table(name="folder")
public class Folder extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Size(max = 45)
    @Column(name="name")
    private String name;

    @NotNull
    @DecimalMin(value="0.0", inclusive = false)
    @Column(name="amount")
    private BigDecimal amount;

    @NotNull
    @DecimalMin(value="0.0", inclusive = false)
    @Column(name="balance")
    private BigDecimal balance;

    public Folder(){}

    public Folder(String name, BigDecimal amount, BigDecimal balance) {
        this.name = name;
        this.amount = amount;
        this.balance = balance;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
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
