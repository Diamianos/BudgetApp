package com.johnsavard.budgetapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BudgetappApplication {

  public static void main(String[] args) {
    SpringApplication.run(BudgetappApplication.class, args);
  }
}
