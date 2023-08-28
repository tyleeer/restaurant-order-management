import { restaurantDetail, shortMenu } from "@/interfaces";

export function swipe(action: string) {
  const detail = document.getElementById("menuDetail") as HTMLDivElement;
  switch (action) {
    case "up":
      detail.classList.remove("translate-y-[100dvh]");
      break;
    case "down":
      detail.classList.add("translate-y-[100dvh]");
      break;
    default:
      detail.classList.add("translate-y-[100dvh]");
      break;
  }
}

export function openCart(action: string) {
  const cart = document.getElementById("menusCart");
  switch (action) {
    case "open":
      cart?.classList.remove("translate-x-[100dvw]");
      break;
    case "close":
      cart?.classList.add("translate-x-[100dvw]");
      break;
    default:
      cart?.classList.add("translate-x-[100dvw]");
      break;
  }
}

export type restaurantType = {
  data: restaurantDetail | undefined;
  loading: boolean;
};

export type restaurantMenuType = {
  data: shortMenu[] | undefined;
  loading: boolean;
};
