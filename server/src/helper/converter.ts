import { AxiosResponse } from 'axios';
import { NutrientRequest, NutrientResponse, BASE_URL, ENDPOINT } from './util';
import axios from 'axios';

export const fetchNutrientData = (requestData: NutrientRequest): Promise<AxiosResponse<NutrientResponse>> => {
  return axios.post(
    `${BASE_URL}${ENDPOINT}`,
    requestData,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': 'a7f2fbc2',      
        'x-app-key': '18655737b97b0bfc4a4f753cd1749bcc'  
      }
    }
  );
};

export async function getNutrientData(food: string) {
  const requestData = {
    query: food
  };

  const returnData = await fetchNutrientData(requestData);
  const information = returnData.data

  return information;
}
