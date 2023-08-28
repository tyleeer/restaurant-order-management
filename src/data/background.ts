import { fullMenu, restaurantDetail, shortMenu } from "@/interfaces";
import { create } from "zustand";

const initData = {
  hiddenShort: { data: undefined, loading: false },
  fetchHiddenDetail: { data: undefined, loading: false },
  fetchHiddenShort: { data: undefined, loading: false },
  fetchHiddenFullMenu: { data: undefined, loading: false },
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
  hiddenShort: short;
  fetchHiddenDetail: detail;
  fetchHiddenShort: short;
  fetchHiddenFullMenu: full;
  setHiddenShortMenu: (value: short) => void;
  setFetchHiddenDetail: (value: detail) => void;
  setFetchHiddenShortMenu: (value: short) => void;
  setFetchHiddenFullMenu: (value: full) => void;
  clearHiddenData: () => void;
};

export const useHiddenDataStore = create<restaurantDataStore>((set) => ({
  ...initData,
  setHiddenShortMenu: (value) => set({ hiddenShort: value }),
  setFetchHiddenDetail: (value) => set({ fetchHiddenDetail: value }),
  setFetchHiddenShortMenu: (value) => set({ fetchHiddenShort: value }),
  setFetchHiddenFullMenu: (value) => set({ fetchHiddenFullMenu: value }),
  clearHiddenData: () => set({ ...initData }),
}));
