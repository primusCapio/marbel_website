

import { SignupForm } from "@/components/forms/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Create a Professional Account",
  description: "Join our platform to unlock exclusive tools for professionals.",
};

export default function SignupPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Create a Professional Account</CardTitle>
            <CardDescription>
              Join our platform to unlock exclusive tools for professionals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
             <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
