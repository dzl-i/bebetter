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

export async function getSteps(activity: string): Promise<any> {
  const request = require('request');
  return new Promise((resolve, reject) => {
    request.get({
      url: 'https://api.api-ninjas.com/v1/caloriesburned?activity=' + activity,
      headers: {
        'X-Api-Key': '+/tapDflUEfVvpnZtiuKPA==6gNXOlBH6Hr3BtOX'
      },
    }, (error: any, response: any, body: any) => {
      if (error) {
        reject('Request failed: ' + error);
      } else if (response.statusCode != 200) {
        reject('Error: ' + response.statusCode + ' ' + body.toString('utf8'));
      } else {
        try {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (parseError) {
          reject('Failed to parse response: ' + parseError);
        }
      }
    });
  });
}
