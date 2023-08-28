import { fullMenu, restaurantDetail, shortMenu } from "@/interfaces";
import axios from "axios";

interface restaurantResponse {
  status: number;
  data: restaurantDetail;
}
interface shortMenuResponse {
  status: number;
  data: shortMenu;
}
interface fullMenuResponse {
  status: number;
  data: fullMenu;
}

export const restaurantService = {
  getRestaurantDetail: async (
    restaurantId: number
  ): Promise<restaurantResponse> => {
    try {
      const response = await axios.get(
        `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}.json`
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("AxiosError:", error);
        throw error;
      } else {
        console.error(error);
        throw new Error("different error than axios");
      }
    }
  },
  getShortMenu: async (
    restaurantId: number,
    menuName: string
  ): Promise<shortMenuResponse> => {
    try {
      const response = await axios.get(
        `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/short.json`
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("AxiosError:", error);
        throw error;
      } else {
        console.error(error);
        throw new Error("different error than axios");
      }
    }
  },
  getFullMenu: async (
    restaurantId: number,
    menuName: string
  ): Promise<fullMenuResponse> => {
    try {
      const response = await axios.get(
        `https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/restaurants/${restaurantId}/menus/${menuName}/full.json`
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("AxiosError:", error);
        throw error;
      } else {
        console.error(error);
        throw new Error("different error than axios");
      }
    }
  },
};
