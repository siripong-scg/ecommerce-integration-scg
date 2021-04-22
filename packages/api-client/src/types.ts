export type Cart = Record<string, unknown>;
export type Wishlist = Record<string, unknown>;
export type ProductVariant = {
  _id: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  price: {
    original: number;
    current: number;
  };
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
};
export type CategoryFilter = Record<string, unknown>;
export type ShippingMethod = Record<string, unknown>;
export type LineItem = Record<string, unknown>;

export type ISearchSuggestionParams = {
  lang: string;
  userTypes: string;
  orgIdfier: string;
  keyword: string;
  limit: number;
  page: number;
}

export type ISearchSuggestion = {
  code: number;
  group: string;
  name: string;
}
