package com.johnsavard.budgetapp.entity;

import javax.persistence.*;

@Entity
@Table(name="time_period")
public class TimePeriod extends AuditModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="month")
    private String month;

    @Column(name="year")
    private int year;

    public TimePeriod() {
    }

    public TimePeriod(String month, int year) {
        this.month = month;
        this.year = year;
    }

    public TimePeriod(int id, String month, int year) {
        this.id = id;
        this.month = month;
        this.year = year;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String monthAndYearToString(){
        return month + " " + Integer.toString(year);
    }

    @Override
    public String toString() {
        return "TimePeriod{" +
                "id=" + id +
                ", month=" + month +
                ", year=" + year +
                '}';
    }
}
