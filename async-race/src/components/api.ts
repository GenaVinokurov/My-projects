import { ICar } from './types';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
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

export const startEngine = async (id: number): Promise<{
  velocity: number,
  distance: number
}> => (await fetch(`${engine}?id=${id}&status=started`, {
  method: 'PATCH',
})).json();

export const stopEngine = async (id: number): Promise<{
  velocity: number,
  distance: number
}> => (await fetch(`${engine}?id=${id}&status=stopped`, {
  method: 'PATCH',
})).json();

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`, { method: 'PATCH' }).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};
