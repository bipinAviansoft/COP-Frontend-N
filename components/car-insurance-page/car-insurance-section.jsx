"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import BgImg from "@/public/images/car-insurance.png";
import InsuranceVector from "@/public/images/car-insurance-banner-vector.png";
import Button from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { sendRequest } from "@/lib/fetch-client";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/store";

const insuranceFormSchema = z.object({
  brand: z.string().min(1, "Please select brand"),
  model: z.string().min(1, "Please select model"),
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

export default function CarInsuranceSection({ brandModels, cities }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectedBrand, setSelectedBrand] = useState("");

  const form = useForm({
    resolver: zodResolver(insuranceFormSchema),
    defaultValues: {
      brand: "",
      model: "",
      fullName: "",
      email: "",
      mobile: "",
      city: "",
      agree: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => sendRequest("car-insurance", data),
    onSuccess: () => {
      toast.success(
        "Thanks for reaching out! Our team will contact you shortly."
      );
      form.reset();
      setSelectedBrand("");
    },
    onError: (error) => {
      toast.error("Something went wrong! Please try again after sometime.");
    },
  });

  function onSubmit(values) {
    const data = {
      brand: values.brand,
      model: values.model,
      city: values.city,
      email: values.email,
      full_name: values.fullName,
      contact_no: values.mobile,
    };

    mutate(data);
  }

  const handleBrandChange = (brandField, id) => {
    setSelectedBrand(id);
    brandField.onChange(id);
  };

  const filteredModels = brandModels.find(
    (brand) => brand.brand_id === selectedBrand
  )?.models;

  const handleSubmitClick = () => {
    if (!user?.mobile) {
      dispatch(openAuthModal());
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
      <div className="lg:col-span-6">
        <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-[40px] 2xl:leading-[52px] leading-normal font-bold w-full lg:w-[70%] text-primary-lighter">
          Your Gateway to Modern Car Insurance Online
        </h1>
        <p className="text-base lg:text-lg bg-primary-darker text-white rounded-md py-1 px-2 inline-flex mt-2 font-medium">
          Car Insurance Policy Thats Easy, Adaptable, and Clear
        </p>

        <Image
          src={BgImg}
          alt=""
          className="w-full md:w-3/4 lg:w-full xl:w-3/4 md:ml-0 m-auto"
          priority
        />
      </div>

      <div className="lg:col-span-6">
        <Image
          src={InsuranceVector}
          alt=""
          className="absolute left-[51%] bottom-[6%] -z-[1] -translate-x-2/4 -translate-y-2/4"
        />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white shadow-md px-4 py-6 lg:px-5 lg:py-7 rounded-3xl mx-0 my-5 md:mx-[30px] xl:mx-[80px] lg:my-0 flex flex-col gap-4 lg:gap-5"
          >
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(id) => handleBrandChange(field, id)}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[#f3f3f3]">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brandModels.map((brand) => {
                        const { brand_id, brand_name } = brand;

                        return (
                          <SelectItem key={brand_id} value={brand_id}>
                            {brand_name}
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
              name="model"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="bg-[#f3f3f3]"
                        disabled={!selectedBrand}
                      >
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredModels?.map((model) => {
                        const { id, name } = model;
                        return (
                          <SelectItem key={id} value={id}>
                            {name}
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Full Name <span className="text-[red]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name as per RC Book"
                      className="bg-[#f3f3f3] border-none h-[45px]"
                      {...field}
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
                type={user?.mobile ? "submit" : "button"}
                onClick={handleSubmitClick}
              >
                {isPending ? (
                  <i className="bx bx-loader-alt text-xl animate-spin"></i>
                ) : (
                  <span className="flex items-center gap-x-2">
                    Get Insurance
                    <i className="bx bx-right-arrow-alt text-xl ml-1"></i>
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
