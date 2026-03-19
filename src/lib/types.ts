export type Category = "Marble" | "Granite" | "Kota Stone";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  longDescription: string;
  images: string[];
};
