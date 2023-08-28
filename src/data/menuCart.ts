import { fullMenu } from "@/interfaces";
import { create } from "zustand";

const initData = {
  menus: [],
};

type eachMenu = {
  amount: number;
  request: string;
  menuData: fullMenu | undefined;
};

type cartStore = {
  menus: eachMenu[];
  setMenus: (value: eachMenu[]) => void;
  clearMenus: () => void;
};

export const useCartStore = create<cartStore>((set) => ({
  ...initData,
  setMenus: (value) => set({ menus: value }),
  clearMenus: () => set({ ...initData }),
}));
