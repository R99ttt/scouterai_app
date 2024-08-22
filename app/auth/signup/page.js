"use client";

import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className="w-full">
      {pending ? "Submitting..." : "Sign up"}
    </Button>
  );
}

export default function AuthenticationPage() {
  const [state, action] = useFormState(signup, {});

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <form action={action} className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">SignUp</h1>
            <p className="text-balance text-muted-foreground">
              {state?.errors?.main ? (
                <span className="text-red-400 ml-auto inline-block text-sm">
                  {state.errors.main}
                </span>
              ) : (
                "Enter your email below to create a new account"
              )}
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Email</Label>
                {state?.errors?.email && (
                  <span className="text-red-400 ml-auto inline-block text-sm">
                    {state.errors.email}
                  </span>
                )}
              </div>
              <Input
                id="email"
                type="email"
                name="email"
                className={state?.errors?.email && "border-red-400"}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password </Label>
                {state?.errors?.password && (
                  <span className="text-red-400 ml-auto inline-block text-sm">
                    {state.errors.password}
                  </span>
                )}
              </div>
              <Input
                className={state?.errors?.password && "border-red-400"}
                id="password"
                type="password"
                name="password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="isScouter" name="isScouter" />
              <label
                htmlFor="isScouter"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I'm a scouter
              </label>
            </div>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}
