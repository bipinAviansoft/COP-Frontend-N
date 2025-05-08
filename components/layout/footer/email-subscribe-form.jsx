"use client";

import Button from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendRequest } from "@/lib/fetch-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string({ required_error: "Please provide email" })
    .email({ message: "Please provide valid email" }),
});

export default function EmailSubscribeForm() {
  const { mutate, isPending } = useMutation({
    mutationFn: (email) =>
      sendRequest(`subscribe?email=${email}`, undefined, "POST"),
    onSuccess: () => {
      toast.success("Successfully subscribed for newsletters!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong! Please try again.");
    },
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    mutate(values.email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative mb-3 max-w-96">
                  <Input
                    type="email"
                    className="bg-primary-lighter/10 pl-12 pr-6 py-6 text-sm lg:text-base placeholder:text-primary-darker"
                    placeholder="Your email address"
                    {...field}
                  />
                  <i className="bx bxs-envelope text-2xl absolute top-1/2 -translate-y-1/2 left-3 z-30 text-primary-darker"></i>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="uppercase px-8 tracking-wider" animated>
          {isPending ? (
            <i className="bx bx-loader-alt text-2xl animate-spin"></i>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </Form>
  );
}
