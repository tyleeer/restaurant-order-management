export interface restaurantDetail {
  name: string;
  id: number;
  coverImage: string;
  menus: string[];
  activeTimePeriod: ActiveTimePeriod;
}

export interface ActiveTimePeriod {
  open: string;
  close: string;
}
