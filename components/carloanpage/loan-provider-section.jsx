"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/lib/fetch-client";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/store";
import { useEffect } from "react";

const loanFormSchema = z.object({
  fullName: z.string().min(1, "Please provide name"),
  email: z
    .string()
    .optional()
    .refine((val) => !val || z.string().email().safeParse(val).success, {
      message: "Please provide valid email",
    }),
  mobile: z
    .string()
    .length(10, "Please enter mobile no. with exact 10 digits")
    .regex(/^[0-9]{10}$/g, "Invalid mobile no."),
  city: z.string().min(1, "Please select city"),
  agree: z.boolean({ message: "Please read and accept privacy policy" }),
});

export default function LoanProviderSection({ cities }) {
  const form = useForm({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      agree: "",
    },
  });

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => sendRequest("car-loan", data),
    onSuccess: () => {
      toast.success(
        "Thanks for reaching out! Our team will contact you shortly."
      );
      form.reset();
    },
    onError: (error) => {
      toast.error("Something went wrong! Please try again after sometime.");
    },
  });

  const onSubmit = (values) => {
    const data = {
      city: values.city,
      email: values.email,
      full_name: values.fullName,
      contact_no: values.mobile,
    };

    if (!user?.mobile) {
      dispatch(openAuthModal());
      return;
    } else {
      mutate(data);
    }
  };

  useEffect(() => {
    if (user?.mobile) {
      form.handleSubmit(onSubmit)();
    }
  }, [user?.mobile, form]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
      <div className="lg:col-span-6">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold w-full lg:w-[70%]">
          Choose the{" "}
          <span className="text-primary-lighter"> Right Loan Provider </span>
        </h1>
        <p className="text-sm xl:text-base text-gray-600 my-3">
          Get the best car loan percentage and low interest rate with our car
          loan calculator, which is easy, adaptable, and clear. Just follow two
          simple steps:
        </p>

        <ul className="list-none mt-5">
          <li className="flex items-center gap-3 text-lg text-gray-500 font-medium mb-4">
            <span className="w-6 h-6 text-base bg-primary-lighter text-white rounded-full flex items-center justify-center">
              1
            </span>{" "}
            Fill in your information.
          </li>
          <li className="flex items-center gap-3 text-lg text-gray-500 font-medium">
            <span className="w-6 h-6 text-base bg-primary-lighter text-white rounded-full flex items-center justify-center">
              2
            </span>{" "}
            Get the car loan details.
          </li>
        </ul>
      </div>
      <div className="lg:col-span-6">
        <div className="bg-white shadow-md px-4 py-6 lg:px-5 lg:py-7 rounded-3xl mx-0 my-5 lg:mx-0 xl:mx-12 lg:my-0 flex flex-col gap-4 lg:gap-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name <span className="text-[red]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name as per Aadhar"
                        {...field}
                        className="bg-[#f3f3f3] border-none h-[45px]"
                      />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="bg-[#f3f3f3] border-none h-[45px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone No. <span className="text-[red]">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="bg-[#f3f3f3] h-[45px] flex items-center justify-center p-2 rounded-l-md text-base">
                          +91
                        </span>
                        <Input
                          type="number"
                          placeholder="Enter your Phone No."
                          className="bg-[#f3f3f3] border-none h-[45px] rounded-l-none"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City <span className="text-[red]">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full bg-[#f3f3f3] border-none h-[45px]">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => {
                          const { id, city_name } = city;

                          return (
                            <SelectItem key={id} value={id}>
                              {city_name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agree"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-start lg:items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          id="terms"
                          className="mt-1 lg:mt-0"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>

                      <FormLabel className="!ml-2 !mt-0">
                        By proceeding ahead you expressly agree to
                        <Link
                          href="/privacy-policy"
                          className="text-blue-500 ml-1"
                        >
                          Privacy Policy
                        </Link>
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-right mr-0 lg:mr-[-50px] mt-3">
                <Button
                  animated
                  variant="primary-gradient"
                  className="px-11 py-2 text-lg font-semibold lg:w-auto w-full"
                  type="submit"
                >
                  {isPending ? (
                    <i className="bx bx-loader-alt text-xl animate-spin"></i>
                  ) : (
                    <span className="flex items-center gap-x-2">
                      Get Loan Offers
                      <i className="bx bx-right-arrow-alt text-xl ml-1"></i>
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
