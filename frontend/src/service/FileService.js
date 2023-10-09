import apiUtils from "./apiUtils";

export const createFile = async (id, path) => {
    try {
        const response = await apiUtils.create(`/v1/projects/${id}/files`,{name:path});
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

export const deleteFile = async (projectId,filedId,path) =>{
    try{
        const response = await apiUtils.del(`v1/projects/${projectId}/files/${filedId}`,{name:path});
        return response
    }catch(error){
        console.error('Error deleting file:', error);
        return error;
    }
} 