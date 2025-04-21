"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/lib/fetch-client";
import { useDispatch } from "react-redux";
import { loginUserWithoutRequestingInfo } from "@/store";
import { toast } from "react-toastify";
import { useEffect } from "react";

const BasicDetailsFormSchema = z
  .object({
    fullName: z.string({ required_error: "Please provide full name" }),
    email: z
      .string({ required_error: "Please provide email" })
      .email("Provide valid email"),
    dob: z.date().optional(),
    anniversaryDate: z.date().optional(),
    maritalStatus: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dob && data.anniversaryDate) {
        return new Date(data.dob) <= new Date(data.anniversaryDate);
      }

      return true;
    },
    {
      message:
        "Date of birth must be earlier than or equal to the anniversary date",
      path: ["dob"],
    }
  );

export default function BasicDetailForm({
  basic,
  defaultValues,
  onSubmissionSuccess,
}) {
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(BasicDetailsFormSchema),
    defaultValues: defaultValues,
  });

  const isMarried = form.getValues()?.maritalStatus === "yes";

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => sendRequest("user/basic-detail", data, "PUT"),
    onSuccess: (response) => {
      const { basicDetails } = response;
      const { name, profile_pic: avatar, contact_no: mobile } = basicDetails;
      dispatch(loginUserWithoutRequestingInfo({ name, avatar, mobile }));
      if (onSubmissionSuccess) {
        onSubmissionSuccess();
      }
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const onSubmit = (data) => {
    const { fullName, email, dob, anniversaryDate } = data;

    mutate({ name: fullName, email, dob, anniversary_date: anniversaryDate });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal gap-x-2 justify-start",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <i className="bx bx-calendar-alt"></i>
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        {!basic && (
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Are you married?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {!basic && isMarried && (
          <FormField
            control={form.control}
            name="anniversaryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Anniversary Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal gap-x-2 justify-start",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <i className="bx bx-calendar-alt"></i>
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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
