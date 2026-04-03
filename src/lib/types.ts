export type Category = "Marble" | "Granite" | "Kota Stone";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  longDescription: string;
  images: string[];
  pricePerSqFt: number;
  finish: string;
  color: string;
};

export const projectStatuses = ["Draft", "Quote Requested", "Quote Sent", "Confirmed", "Delivered", "Completed"] as const;
export type ProjectStatus = typeof projectStatuses[number];

export type Project = {
  id: string;
  projectName: string;
  siteLocation: string;
  clientName: string;
  areaRequired: number;
  timeline?: string;
  status: ProjectStatus;
  deliveryCity: string;
  createdAt: string;
};
