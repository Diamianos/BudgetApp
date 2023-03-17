import React from 'react'
import { Folder } from './Folder'
import FolderRow from './FolderRow'

// https://minicss.us/docs.htm#tables

interface FolderListProps {
    folders: Folder[]
}

export default function FolderList({folders}: FolderListProps) {
  return (
        <div>
        <table className="folder-table striped hoverable">
            <caption>Folders</caption>
            <thead>
                <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Balance</th>
                <th className="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {folders.map((folder) => (
                    <FolderRow key={folder.id} folder={folder} />
                ))}
            </tbody>
        </table>
        </div>
  )
}

