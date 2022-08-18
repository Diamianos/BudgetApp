package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Folder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FolderServiceImpl implements FolderService{

    private FolderRepository folderRepository;

    @Autowired
    public FolderServiceImpl(FolderRepository folderRepository) {
        this.folderRepository = folderRepository;
    }

    @Override
    public List<Folder> findAll() {
        return folderRepository.findAll();
    }

    @Override
    public Folder findById(int theId) {
        return null;
    }

    @Override
    public void save(Folder theEmployee) {

    }

    @Override
    public void deleteById(int theId) {

    }
}
