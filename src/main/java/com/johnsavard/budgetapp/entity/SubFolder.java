package com.johnsavard.budgetapp.entity;

import com.johnsavard.budgetapp.enums.MonthPeriod;
import com.johnsavard.budgetapp.utilities.TagAttributeConverter;
import java.math.BigDecimal;
import java.util.Map;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

@Entity
@Table(name = "sub_folder")
public class SubFolder extends AuditModel {

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

  @Size(max = 50)
  @Column(name = "description")
  private String description;

  @NotNull
  @Enumerated(EnumType.STRING)
  @Column(name = "month_period")
  private MonthPeriod monthPeriod;

  @Convert(converter = TagAttributeConverter.class)
  @Column(name = "tags")
  private Map<String, String> tags;

  // Great article about one to many mappings with Spring Boot: https://www.callicoder.com/hibernate-spring-boot-jpa-one-to-many-mapping-example/
  @ManyToOne(
    cascade = {
      CascadeType.PERSIST,
      CascadeType.MERGE,
      CascadeType.DETACH,
      CascadeType.REFRESH,
    }
  )
  @JoinColumn(name = "folder_id")
  private Folder folder;

  public SubFolder() {}

  public SubFolder(
    @NotNull @Size(max = 45) String name,
    @NotNull @DecimalMin(value = "0.0", inclusive = false) BigDecimal amount,
    @DecimalMin(value = "0.0", inclusive = true) BigDecimal balance,
    @NotNull MonthPeriod monthPeriod
  ) {
    this.name = name;
    this.amount = amount;
    this.balance = balance;
    this.monthPeriod = monthPeriod;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
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

  public Folder getFolder() {
    return folder;
  }

  public void setFolder(Folder folder) {
    this.folder = folder;
  }

  public MonthPeriod getMonthPeriod() {
    return monthPeriod;
  }

  public void setMonthPeriod(MonthPeriod monthPeriod) {
    this.monthPeriod = monthPeriod;
  }

  public Map<String, String> getTags() {
    return tags;
  }

  public void setTags(Map<String, String> tags) {
    this.tags = tags;
  }

  @Override
  public String toString() {
    return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
  }
}
