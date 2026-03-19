import { CheckoutForm } from "@/components/forms/checkout-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Checkout",
  description: "Complete your order by providing your details.",
};

export default function CheckoutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Checkout</CardTitle>
            <CardDescription>
              Please fill in your details to complete the purchase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CheckoutForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
