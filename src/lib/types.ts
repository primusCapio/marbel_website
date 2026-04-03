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

// Billing System Types
export interface InvoiceItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export const paymentModes = ["Cash", "UPI", "Card", "Bank Transfer"] as const;
export type PaymentMode = (typeof paymentModes)[number];

export const paymentStatuses = ["Paid", "Pending", "Partial"] as const;
export type PaymentStatus = (typeof paymentStatuses)[number];

export interface InvoiceData {
  customerName: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  discount: number;
  tax: number;
  additionalCharges: number;
  total: number;
  paymentMode: PaymentMode;
  paymentStatus: PaymentStatus;
}

export interface Invoice extends InvoiceData {
  id: string;
  invoiceNumber: string;
  date: string;
}
