import { fullMenu, restaurantDetail, shortMenu } from "@/interfaces";
import { create } from "zustand";

const initData = {
  fetchRestaurantDetail: { data: undefined, loading: false },
  shortMenu: { data: undefined, loading: false },
  fetchShortMenu: { data: undefined, loading: false },
  fetchFullMenu: { data: undefined, loading: false },
};

type detail = {
  data: restaurantDetail | undefined;
  loading: boolean;
};

type short = {
  data: shortMenu[] | undefined;
  loading: boolean;
};

type full = {
  data: fullMenu | undefined;
  loading: boolean;
};

type restaurantDataStore = {
  fetchRestaurantDetail: detail;
  shortMenu: short;
  fetchShortMenu: short;
  fetchFullMenu: full;
  setFetchRestaurantDetail: (value: detail) => void;
  setShortMenu: (value: short) => void;
  setFetchShortMenu: (value: short) => void;
  setFetchFullMenu: (value: full) => void;
  clearRestaurantData: () => void;
};

export const useRestaurantDataStore = create<restaurantDataStore>((set) => ({
  ...initData,
  setFetchRestaurantDetail: (value) => set({ fetchRestaurantDetail: value }),
  setShortMenu: (value) => set({ shortMenu: value }),
  setFetchShortMenu: (value) => set({ fetchShortMenu: value }),
  setFetchFullMenu: (value) => set({ fetchFullMenu: value }),
  clearRestaurantData: () => set({ ...initData }),
}));
