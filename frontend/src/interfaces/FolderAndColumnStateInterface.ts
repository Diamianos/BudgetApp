import { ColumnStateInterface } from "./ColumnStateInterface";
import { FolderStateInterface } from "./FolderStateInterface";


export interface FolderAndColumnStateInterface{
    folders: FolderStateInterface,
    columns: ColumnStateInterface,
    columnOrder: string[]
}