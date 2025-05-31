"use client";
import Image from "next/image";
import B2BImg from "@/public/images/b2b-img.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function B2BpartnerSection() {
  const [processing, setProcessing] = useState("Submit");

  const router = useRouter();

  const [input, setInput] = useState({
    full_name: "",
    email: "",
    contact_no: "",
    dealer_name: "",
    dealer_address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact_no") {
      if (value.length > 10) {
        return;
      }
      if (!/^\d*$/.test(value)) {
        return;
      }
    }
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (
      !input?.full_name ||
      !input?.email ||
      !input?.contact_no ||
      !input?.dealer_name ||
      !input?.dealer_address
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      // Send POST request to the API endpoint
      setProcessing("Please wait...");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/b2b-inquiry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input), // Send the form data as a JSON body
        }
      );

      const data = await response.json();
      // Handle the response
      if (response.ok) {
        // On successful submission, reset the form and redirect to the thank you page

        toast.success(data.message);
        setProcessing("Submit");
        setTimeout(() => {
          setInput({
            full_name: "",
            email: "",
            contact_no: "",
            dealer_name: "",
            dealer_address: "",
          });
          router.push("/b2b-inquiry/thank-you");
        }, 1000);
      } else {
        toast.error(data.message);
        setProcessing("Submit");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
      setProcessing("Submit");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 items-center">
      <div className="sm:col-span-6 lg:col-span-7">
        <Image
          src={B2BImg}
          alt=""
          className="w-full md:w-[400px] mb-5 "
          priority
        />
        <h1 className="text-2xl mb-5 lg:text-3xl xl:text-4xl font-bold lg:mb-2 text-black">
          Partner with CarOnPhone For Automotive Solutions
        </h1>
        <p className="text-sm lg:text-base font-normal text-gray-500">
          to accelerate the speed of your digital expansion.
        </p>
      </div>
      <div className="sm:col-span-6 lg:col-span-5">
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-md px-4 py-6 lg:px-5 lg:py-7 rounded-3xl mx-0 my-5 md:mx-[30px] xl:mx-[80px] lg:my-0 flex flex-col gap-4 lg:gap-5">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="name" className="text-sm">
                Full Name<span className="text-red">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="full_name"
                value={input.full_name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="border rounded-md border-gray-400 h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0 "
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="phonenumber" className="text-sm">
                Contact No.*
              </Label>
              <div className="flex">
                <span className="border rounded-md border-gray-400 h-[45px] flex items-center justify-center p-2 text-base rounded-r-none">
                  +91
                </span>
                <Input
                  type="number"
                  id="phonenumber"
                  placeholder="00000 - 00000"
                  name="contact_no"
                  value={input.contact_no}
                  onChange={handleChange}
                  maxLength="10"
                  className=" border rounded-md border-gray-400 h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0 rounded-l-none border-l-0"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="email" className="text-sm">
                Mail ID*
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className=" border rounded-md border-gray-400 h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0 "
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="dealername" className="text-sm">
                Dealership Name*
              </Label>
              <Input
                type="text"
                id="dealername"
                name="dealer_name"
                value={input.dealer_name}
                onChange={handleChange}
                placeholder="Enter Dealership Name"
                className=" border rounded-md border-gray-400 h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0 "
              />
            </div>
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="dealeraddress" className="text-sm">
                Dealership Address*
              </Label>
              <Input
                type="text"
                id="dealeraddress"
                name="dealer_address"
                value={input.dealer_address}
                onChange={handleChange}
                placeholder="Enter Address"
                className=" border rounded-md border-gray-400 h-[45px] focus-visible:ring-0 focus-visible:ring-offset-0 "
              />
            </div>

            <div className="">
              <Button
                type="submit"
                animated
                className="px-11 py-2 text-base font-semibold lg:w-auto w-full"
                style={{
                  background:
                    "linear-gradient(121deg, #00437c 0%, #002b4f 100%)",
                }}
              >
                {processing}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
