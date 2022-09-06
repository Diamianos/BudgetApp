package com.johnsavard.budgetapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Optional;

@Entity
@Table(name="expense")
public class Expense extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @NotNull
    @Size(max=45)
    @Column(name="merchant")
    private String merchant;

    @NotNull
    @DecimalMin(value="0.0", inclusive = false)
    @Column(name="amount")
    private BigDecimal amount;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "folder_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Folder folder;



    public Expense() {
    }

    public Expense(String merchant, BigDecimal amount) {
        this.merchant = merchant;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getMerchant() {
        return merchant;
    }

    public void setMerchant(String merchant) {
        this.merchant = merchant;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder (Folder folder) {
        this.folder = folder;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", merchant='" + merchant + '\'' +
                ", amount=" + amount +
                ", folder=" + folder +
                '}';
    }
}
