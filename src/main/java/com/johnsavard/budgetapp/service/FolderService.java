package com.johnsavard.budgetapp.service;

import com.johnsavard.budgetapp.dao.FolderRepository;
import com.johnsavard.budgetapp.entity.Folder;
import com.johnsavard.budgetapp.entity.TimePeriod;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FolderService {

    private FolderRepository folderRepository;

    public FolderService(FolderRepository folderRepository){
        this.folderRepository = folderRepository;
    }

    public List<Folder> findAllFolders(){
        return folderRepository.findAll();
    }

    public Optional<Folder> findFolderById(int folderId){
        return folderRepository.findById(folderId);
    }

    public void saveFolder(Folder folder){
        if (folder.getId() == 0){
            folder.setBalance(folder.getAmount());
        }
        folderRepository.save(folder);
    }

    public void deleteFolder(int folderId){
        folderRepository.deleteById(folderId);
    }

    public List<Folder> findAllByTimePeriod(TimePeriod timePeriod){ return folderRepository.findAllByTimePeriod(timePeriod);}
}
