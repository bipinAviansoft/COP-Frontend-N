"use client";

import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateStage } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authStages } from "@/data/constants";
import { sendRequest } from "@/lib/fetch-client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const formSchema = z.object({
  mobile: z
    .string()
    .length(10, "Please enter mobile no. with exact 10 digits")
    .regex(/^[0-9]{10}$/g, "Invalid mobile no."),
});

export default function AuthForm() {
  const { stage, mobile } = useSelector((state) => state.auth);
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: mobile,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => sendRequest(`login/send-otp`, data),
    onSuccess: (data, formData) => {
      dispatch(
        updateStage({
          stage: authStages.OTP_VERFICATION,
          mobile: formData?.mobile,
        })
      );
    },
    onError: (error) => {
      setFormError(error?.message);
    },
  });

  function onSubmit(values) {
    mutate(values);
  }
 
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          Login to your account
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your mobile no. to recieve one time password!
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-4"
        >
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile No.</FormLabel>
                <FormControl>
                  <div className="flex">
                    <span className="inline-block px-3 py-2 border rounded-l-lg">
                      +91
                    </span>
                    <Input
                      type="number"
                      id="mobile"
                      placeholder="Enter 10 digit mobile number"
                      className="grow h-auto rounded-l-none rounded-r-lg outline-none"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      disabled={stage === authStages.OTP_VERFICATION}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-y-2">
            <Button animated type="submit" disabled={isPending}>
              {isPending ? (
                <i className="bx bx-loader-alt text-2xl animate-spin"></i>
              ) : (
                "Send OTP"
              )}
            </Button>
            {formError && (
              <p className="text-sm text-destructive font-medium">
                {formError}
              </p>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
