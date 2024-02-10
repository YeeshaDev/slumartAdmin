import axios from "axios";

export const DeleteArtProducts = async (id) => {
    const response = await axios.delete(`https://slumart-production.up.railway.app/slum/sell/artpiece/${id}/`);
    //console.log(`${apiUrlProductVariant}?product=${productId}`);
    return response.data;
  };
export const DeleteProjects = async (id) => {
    const response = await axios.delete(`https://slumart-production.up.railway.app/slum/project/${id}/`);
    //console.log(`${apiUrlProductVariant}?product=${productId}`);
    return response.data;
  };