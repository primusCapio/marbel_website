
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
  title: "Architect Sign Up",
  description: "Create a new architect account.",
};

export default function SignupPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Create Architect Account</CardTitle>
            <CardDescription>
              Join our platform to unlock exclusive tools for architects.
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
