import {Folder} from '../Folder'

export const InitialData  = {
    folders: {
        'folder-1': new Folder({
            id: 1,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "John",
            amount: "100",
            balance: "100",
        }),
        'folder-2': new Folder({
            id: 2,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "Emily",
            amount: "300",
            balance: "300",
        }),
        'folder-3': new Folder({
            id: 3,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "Isabella",
            amount: "100",
            balance: "100",
        }),
        'folder-4': new Folder({
            id: 4,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "Elizabeth",
            amount: "200",
            balance: "200",
        }),
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Distribute',
            folderIds: ['folder-1', 'folder-2', 'folder-3', 'folder-4'],
        },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1'],
}