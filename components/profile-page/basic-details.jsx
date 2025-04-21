"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Button from "../ui/button";
import ImageUpload from "./image-upload";
import BasicDetailForm from "./basic-detail-form";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddressBookForm from "./address-book-form";

export default function BasicDetails({ basicDetails, base64Avatar }) {
  const {
    name,
    email,
    address_1,
    address_2,
    contact_no,
    dob,
    anniversary_date,
  } = basicDetails;

  const router = useRouter();
  const [isBasicDetailsModalOpen, setIsBasicDetailsModalOpen] = useState(false);
  const [isAddressBookModalOpen, setIsAddressBookModalOpen] = useState(false);

  const onSubmissionSuccess = () => {
    setIsBasicDetailsModalOpen(false);
    setIsAddressBookModalOpen(false);
    router.refresh();
  };

  return (
    <div className="tab-content grid grid-cols-1 gap-5">
      {/* basic details */}
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl mt-[60px] lg:mt-0">
        <div className="grid lg:hidden w-full items-center -mt-[60px] mb-5">
          <ImageUpload base64Avatar={base64Avatar} />
        </div>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg lg:text-xl xl:text-2xl text-black font-semibold">
            Basic Details
          </h2>
          <Dialog
            open={isBasicDetailsModalOpen}
            onOpenChange={setIsBasicDetailsModalOpen}
          >
            <DialogTrigger className="bg-[#8080808c] px-2 py-1 text-sm lg:px-3 lg:py-1 lg:text-base font-medium text-white rounded-md flex items-center gap-1">
              <i className="bx bx-pencil"></i> Edit
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update Basic Details</DialogTitle>
                <span className="hidden">
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </span>
              </DialogHeader>
              <BasicDetailForm
                defaultValues={{
                  fullName: name,
                  email,
                  dob: dob ? new Date(dob) : undefined,
                  maritalStatus: anniversary_date ? "yes" : "no",
                  anniversaryDate: anniversary_date
                    ? new Date(anniversary_date)
                    : undefined,
                }}
                onSubmissionSuccess={onSubmissionSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-y-5">
          <div>
            <label className="text-sm text-gray-500 font-medium">Name</label>
            <h5 className="text-base text-black font-medium">
              {name || "---"}
            </h5>
          </div>
          <div>
            <label className="text-sm text-gray-500 font-medium">
              Phone No.
            </label>
            <h5 className="text-base text-black font-medium">{contact_no}</h5>
          </div>
          <div>
            <label className="text-sm text-gray-500 font-medium">Email</label>
            <h5 className="text-base text-black font-medium">
              {email || "---"}
            </h5>
          </div>
          {anniversary_date && (
            <div>
              <label className="text-sm text-gray-500 font-medium">
                Anniversary Date
              </label>
              <h5 className="text-base text-black font-medium">
                {format(new Date(anniversary_date), "PPP")}
              </h5>
            </div>
          )}
          {dob && (
            <div>
              <label className="text-sm text-gray-500 font-medium">
                Date of Birth
              </label>
              <h5 className="text-base text-black font-medium">
                {format(new Date(dob), "PPP")}
              </h5>
            </div>
          )}
        </div>
      </div>

      {/* address book */}
      <div className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg lg:text-xl xl:text-2xl text-black font-semibold text-left">
            Address Book
          </h2>
          <Dialog
            open={isAddressBookModalOpen}
            onOpenChange={setIsAddressBookModalOpen}
            className="mx-3"
          >
            <DialogTrigger className="bg-[#8080808c] px-2 py-1 text-sm lg:px-3 lg:py-1 lg:text-base font-medium text-white rounded-md flex items-center gap-1">
              <i className="bx bx-pencil"></i> Edit
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Address Book</DialogTitle>
                <span className="hidden">
                  <DialogDescription></DialogDescription>
                </span>
              </DialogHeader>
              <AddressBookForm
                defaultValues={{
                  address1: address_1 || "",
                  address2: address_2 || "",
                }}
                onSubmissionSuccess={onSubmissionSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:gap-y-5">
          <div>
            <label className="text-sm text-gray-500 font-medium">
              Address 1
            </label>
            <h5 className="text-base text-black font-medium">
              {address_1 || "---"}
            </h5>
          </div>
          <div>
            <label className="text-sm text-gray-500 font-medium">
              Address 2
            </label>
            <h5 className="text-base text-black font-medium">
              {address_2 || "---"}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
