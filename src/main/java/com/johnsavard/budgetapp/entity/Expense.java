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
@Table(name = "expense")
public class Expense extends AuditModel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @JsonFormat(pattern = "MM-dd-yyyy")
  @Column(name = "date_of_transaction")
  private Date dateOfTransaction;

  @NotNull
  @Size(max = 45)
  @Column(name = "merchant")
  private String merchant;

  @NotNull
  @DecimalMin(value = "0.0", inclusive = false)
  @Column(name = "amount")
  private BigDecimal amount;

  @Size(max = 50)
  @Column(name = "description")
  private String description;

  @ManyToOne(
    cascade = {
      CascadeType.PERSIST,
      CascadeType.MERGE,
      CascadeType.DETACH,
      CascadeType.REFRESH,
    }
  )
  @JoinColumn(name = "sub_folder_id", nullable = false)
  private SubFolder subFolder;

  public Expense() {}

  public Expense(
    Date dateOfTransaction,
    @NotNull @Size(max = 45) String merchant,
    @NotNull @DecimalMin(value = "0.0", inclusive = false) BigDecimal amount,
    @Size(max = 50) String description
  ) {
    this.dateOfTransaction = dateOfTransaction;
    this.merchant = merchant;
    this.amount = amount;
    this.description = description;
  }

  public Date getDateOfTransaction() {
    return dateOfTransaction;
  }

  public void setDateOfTransaction(Date dateOfTransaction) {
    this.dateOfTransaction = dateOfTransaction;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public SubFolder getSubFolder() {
    return subFolder;
  }

  public void setSubFolder(SubFolder subFolder) {
    this.subFolder = subFolder;
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

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
  }
}
