export interface shortMenu {
  name: string;
  id: string;
  thumbnailImage?: string;
  discountedPercent: number;
  discountedTimePeriod?: DiscountedTimePeriod;
  fullPrice: number;
  sold: number;
  totalInStock: number;
}

export interface DiscountedTimePeriod {
  begin: string;
  end: string;
}
