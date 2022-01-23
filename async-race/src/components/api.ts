import { ICar } from './types';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;

// export const getCars: any = async () => {
//   const response = await axios.get(garage);
//   return response.data;
// };

export const getCars: any = async (page: number = 1, limit: number = 7) => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const creatCar = async ({ name, color }: ICar) => (await fetch(`${garage}`, {
  method: 'POST',
  body: JSON.stringify({ name, color }),
  headers: {
    'Content-type': 'application/json',
  },
})).json;

export const deleteCar = async (id: any) => (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async ({ name, color, id }: ICar) => (await fetch(`${garage}/${id}`, {
  method: 'PUT',
  body: JSON.stringify({ name, color }),
  headers: {
    'Content-type': 'application/json',
  },
})).json;
