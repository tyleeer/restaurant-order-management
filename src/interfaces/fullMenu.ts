export interface fullMenu {
  name: string;
  id: string;
  thumbnailImage?: string;
  discountedPercent: number;
  discountedTimePeriod?: DiscountedTimePeriod;
  sold: number;
  fullPrice: number;
  totalInStock: number;
  options: Option[];
  largeImage?: string;
}

export interface DiscountedTimePeriod {
  begin: string;
  end: string;
}

export interface Option {
  label: string;
  choices: Choice[];
}

export interface Choice {
  label: string;
}
