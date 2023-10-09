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

export const deleteFile = async (projectId,fileId) =>{
    try{
        const response = await apiUtils.del(`/v1/projects/${projectId}/files/${fileId}`);
        return response
    }catch(error){
        console.error('Error deleting file:', error);
        return error;
    }
}

export const runFile = async (projectId, fileId, path) => {
    try {
        const response = await apiUtils.read(`/v1/projects/${projectId}/files/${fileId}/run`);
        if (!response.success) {
            throw new Error(response.error);
        }
        return response;
    } catch(error) {
        console.error('Error running file:', error);
        throw error;
    }
}