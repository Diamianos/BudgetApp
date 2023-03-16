import React from 'react'
import { Folder } from './Folder'

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
                </tr>
            </thead>
            <tbody>
                {folders.map((folder) => (
                    <tr key={folder.id}>
                        <td data-label="Name">{folder.name}</td>
                        <td data-label="Amount">{folder.amount}</td>
                        <td data-label="Balance">{folder.balance}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
  )
}

