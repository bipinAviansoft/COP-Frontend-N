"use client";

import { sendRequest } from "@/lib/fetch-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Button from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

const AddressBookFormSchema = z.object({
  address1: z.string().min(1, "Please provide address line 1"),
  address2: z.string().min(1, "Please provide address line 2"),
});

export default function AddressBookForm({
  defaultValues,
  onSubmissionSuccess,
}) {
  const form = useForm({
    resolver: zodResolver(AddressBookFormSchema),
    defaultValues: defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => sendRequest("user/address", data, "PUT"),
    onSuccess: () => {
      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const onSubmit = (data) => {
    const { address1, address2 } = data;
    mutate({ address_1: address1, address_2: address2 });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="address1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1 *</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Address Line 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line 1 *</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter Address Line 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isPending ? (
            <i className="bx bx-loader-alt text-xl animate-spin"></i>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
