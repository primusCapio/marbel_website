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

export const projectShapes = ["Rectangle", "Square", "Circle", "L-Shape", "Custom"] as const;
export type ProjectShape = (typeof projectShapes)[number];

export const projectUrgencies = ["Low", "Medium", "High"] as const;
export type ProjectUrgency = (typeof projectUrgencies)[number];

export type DimensionUnit = "ft" | "in";

export type Project = {
  id: string;
  projectName: string;
  siteLocation: string;
  clientName: string;
  areaRequired?: number; // Kept for backward compatibility with old data
  length?: number;
  breadth?: number;
  unit?: DimensionUnit;
  shape?: ProjectShape;
  urgency?: ProjectUrgency;
  timeline?: string;
  status: ProjectStatus;
  deliveryCity: string;
  createdAt: string;
};
