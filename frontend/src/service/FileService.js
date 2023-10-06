import apiUtils from "./apiUtils";

export const createFile = async (id, fileData) => {
    try {
        const response = await apiUtils.createFile(`/v1/projects/${id}/files`, fileData);
        return response;
    } catch (error) {
        console.error('Error creating file:', error);
        return error;
    }
}

export const getFile = async (projectId,fileId) => {
    try {
        const response = await apiUtils.readFile(`/v1/projects/${projectId}/files/${fileId}`);
        return response;
    } catch (error) {
        console.error('Error getting file:', error);
        return error;
    }
}

export const deleteFile = async (id) =>{
    try{
        const response = await apiUtils.del(`v1/projects/${id}/files`);
        return response``
    }catch(error){
        console.error('Error deleting file:', error);
        return error;
    }
} 