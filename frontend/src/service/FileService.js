import apiUtils from "./apiUtils";

export const createFile = async (id, fileName) => {
    try {
        const response = await apiUtils.create(`/v1/projects/${id}/files`,{name:fileName});
        return response;
    } catch (error) {
        console.error('Error creating file:', error);
        return error;
    }
}

export const getFile = async (projectId,fileId) => {
    try {
        const response = await apiUtils.read(`/v1/projects/${projectId}/files/${fileId}`);
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