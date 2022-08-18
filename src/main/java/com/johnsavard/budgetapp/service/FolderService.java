package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.entity.Folder;

import java.util.List;

public interface FolderService {

    public List<Folder> findAll();

    public Folder findById(int theId);

    public void save(Folder theEmployee);

    public void deleteById(int theId);
}
