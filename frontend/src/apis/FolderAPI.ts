import { Folder } from '../pages/folders/Folder';

function translateStatusToErrorMessage(status: number) {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the folder(s).';
    default:
      return 'There was an error retrieving the folder(s). Please try again.';
  }
}

function checkStatus(response: any) {
  if (response.ok) {
    return response;
  } else {
    const httpErrorInfo = {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    };
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    let errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
    throw new Error(errorMessage);
  }
}

function parseJSON(response: Response) {
  return response.json();
}

// eslint-disable-next-line
function delay(ms: number) {
  return function (x: any): Promise<any> {
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
}

function convertToProjectModels(data: any[]): Folder[] {
  let folders: Folder[] = data.map(convertToFolderModel);
  return folders;
}

function convertToFolderModel(item: any): Folder {
  return new Folder(item);
}

const folderAPI = {
    get() {
        return fetch('/folder')
        .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModels)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
            'There was an error retrieving the folder. Please try again.'
            );
        });
    },

    post(folder: Folder) {
        return fetch('/folder', {
            method: 'POST',
            body: JSON.stringify(folder),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error adding the folder. Please try again.'
            );
            });
        },

    put (folder: Folder){
        return fetch(`/folder/${folder.id}`, {
            method: 'PUT',
            body: JSON.stringify(folder),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error adding the folder. Please try again.'
            );
            });
    },

    delete(folder: Folder){
        return fetch(`/folder/${folder.id}`, {
            method: 'DELETE',
            })
        .then(checkStatus)
        .catch((error: TypeError) => {
            console.log('log client error ' + error);
            throw new Error(
                'There was an error deleting the folder. Please try again.'
            );
            });
    } 
};

export { folderAPI };