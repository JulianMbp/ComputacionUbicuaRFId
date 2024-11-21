import { RfidData } from "../types/rfidData";

const API_URL = "http://127.0.0.1:8000/api/ubicua/rfid/";

export const fetchRfidData = async (): Promise<RfidData[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
