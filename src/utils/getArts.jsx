 import axios from 'axios'
 export const fetchArtProducts = async () => {
    const response = await axios.get('https://slumart-production.up.railway.app/slum/sell/artpiece/');
    //console.log(`${apiUrlProductVariant}?product=${productId}`);
    return response.data;
  };

  export const fetchProjects = async () => {
    const response = await axios.get('https://slumart-production.up.railway.app/slum/project/');
    //console.log(`${apiUrlProductVariant}?product=${productId}`);
    return response.data;
  };
  