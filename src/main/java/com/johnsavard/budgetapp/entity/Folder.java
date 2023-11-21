package com.johnsavard.budgetapp.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Entity
@Table(name = "folder")
public class Folder extends AuditModel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @NotNull
  @Size(max = 45)
  @Column(name = "name")
  private String name;

  @NotNull
  @DecimalMin(value = "0.0", inclusive = false)
  @Column(name = "amount")
  private BigDecimal amount;

  @DecimalMin(value = "0.0", inclusive = true)
  @Column(name = "balance")
  private BigDecimal balance;

  @JsonFormat(pattern = "MM-dd-yyyy")
  @Column(name = "monthYearPeriod")
  private Date monthYearPeriod;

  public Folder() {}

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

  public Date getMonthYearPeriod() {
    return monthYearPeriod;
  }

  public void setMonthYearPeriod(Date monthYearPeriod) {
    this.monthYearPeriod = monthYearPeriod;
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
  }
}
