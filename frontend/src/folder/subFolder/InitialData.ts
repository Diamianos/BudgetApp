import {Folder} from '../Folder'

export const InitialData  = {
    folders: {
        '1': new Folder({
            id: 1,
            draggable_id: 1,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "John",
            amount: 100,
            balance: 100,
        }),
        '2': new Folder({
            id: 2,
            draggable_id: 2,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "Emily",
            amount: 300,
            balance: 300,
        }),
        '3': new Folder({
            id: 3,
            draggable_id: 3,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "Isabella",
            amount: 100,
            balance: 100,
        }),
        '4': new Folder({
            id: 4,
            draggable_id: 4,
            created_at: '2023-02-14 17:38:39',
            modified_at: '2023-02-14 17:38:39',
            name: "Elizabeth",
            amount: 200,
            balance: 200,
        }),

    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Days 1-14',
            folderIds: [],
        },
        'column-2': {
            id: 'column-2',
            title: 'Distribute',
            folderIds: ['1', '2', '3', '4'],
        },
        'column-3': {
            id: 'column-3',
            title: 'Days 15 - 30',
            folderIds: [],
        },
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3'],
}