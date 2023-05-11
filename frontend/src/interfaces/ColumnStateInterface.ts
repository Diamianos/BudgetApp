export interface ColumnStateInterface{
    [index:string]:{
        id: string,
        title: string,
        folderIds: string[]
    }
}