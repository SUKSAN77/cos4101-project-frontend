import axios from "axios";
import ruBackofficeApi from ".";
import { EquipmentsResponse} from "./interface";

/**
 * Fetches equipment data with pagination
 * @param limit - Number of items per page
 * @param offset - Number of items to skip
 * @returns Equipment data or error message
 */
export const getEquipments = async (limit: number, offset: number) => {
  try {
    const response = await ruBackofficeApi.get<EquipmentsResponse>(
      `/equipments?limit=${limit}&offset=${offset}`
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: error.response?.data.error || 'An unknown error occurred',
        status: error.response?.status
      };
    }
    return {
      error: 'An unexpected error occurred',
      status: 500
    };
  }
};
