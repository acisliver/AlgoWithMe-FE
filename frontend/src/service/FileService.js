import apiUtils from "./apiUtils";

export const createFile = async (id, fileName,path) => {
    try {
        const response = await apiUtils.create(`/v1/projects/${id}/files`,{name:fileName, path:path});
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

export const deleteFile = async (id,filedId) =>{
    try{
        const response = await apiUtils.del(`v1/projects/${id}/files/${filedId}`);
        return response``
    }catch(error){
        console.error('Error deleting file:', error);
        return error;
    }
} 