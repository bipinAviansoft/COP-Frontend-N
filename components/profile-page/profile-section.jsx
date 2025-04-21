"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import BtdImg from "@/public/images/book_test_drive_img.svg";
import AccountImg from "@/public/images/news_update.png";
import AddBtdImg from "@/public/images/tata-car-img.webp";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../ui/button";
import BasicDetails from "./basic-details";
import ImageUpload from "./image-upload";
import { sendRequest } from "@/lib/fetch-client";
import { logout } from "@/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function ProfileSection({ basicDetails, testDrives }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const base64Avatar = basicDetails?.profile_pic || "";

  const [activeTab, setActiveTab] = useState("profile");

  const handleLogoutClick = async () => {
    try {
      await sendRequest("log-out");
      dispatch(logout());
      router.replace("/");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="flex flex-wrap -mx-3">
      <div className="w-full lg:w-1/4 px-3 hidden lg:block">
        <div className="bg-white rounded-2xl h-[calc(100%-80px)] flex flex-col justify-between mt-[80px]">
          <div>
            <div className="hidden lg:grid w-full items-center -mt-[60px] mb-3">
              <ImageUpload base64Avatar={base64Avatar} />
            </div>
            <div className="tabs-header w-full pl-5 py-3">
              <div className="flex flex-wrap">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full px-4 text-left py-3 rounded-l-xl font-semibold ${
                    activeTab === "profile"
                      ? "bg-primary-darker text-white"
                      : "bg-transparent text-black"
                  }`}
                >
                  Profile Details
                </button>
                <button
                  onClick={() => setActiveTab("test-drives")}
                  className={`w-full px-4 text-left py-3 rounded-l-xl font-semibold ${
                    activeTab === "test-drives"
                      ? "bg-primary-darker text-white"
                      : "bg-transparent text-black"
                  }`}
                >
                  My Test Drives
                </button>
              </div>
            </div>
          </div>
          <div className="flex p-3 xl:p-5 flex-col gap-3">
            <Button
              animated
              className="w-full py-[10px] px-3 xl:px-8 text-base bg-[#80808010] text-gray-500 uppercase justify-start gap-2"
              onClick={handleLogoutClick}
            >
              <i className="bx bx-log-out bx-rotate-180 text-2xl"></i>Logout
            </Button>
            <AlertDialog>
              <AlertDialogTrigger className="w-full py-[10px] px-3 xl:px-8 text-base bg-[#80808010] text-gray-500 uppercase flex justify-start items-center gap-2 font-medium">
                <i className="bx bx-error bx-flip-horizontal text-2xl"></i>
                Delete Account
              </AlertDialogTrigger>
              <AlertDialogContent className="p-0 rounded-3xl gap-0 w-[95%] md:w-auto">
                <AlertDialogHeader className="border-b-[1px] border-gray-300 p-5 lg:p-8">
                  <Image
                    src={AccountImg}
                    alt=""
                    className="w-20 h-20 rounded-full m-auto"
                  />
                  <AlertDialogTitle className="text-xl lg:text-2xl font-semibold text-center">
                    Delete your account?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm lg:text-base font-normal text-gray-500 text-center">
                    you will lose all your data by deleting your account. this
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="p-3 flex-nowrap flex-row justify-end items-center">
                  <AlertDialogCancel
                    animated
                    className="px-6 m-0 w-auto bg-primary-darker text-white uppercase hover:bg-primary-darker hover:text-white"
                  >
                    No
                  </AlertDialogCancel>
                  <AlertDialogAction className="bg-transparent w-auto text-red-600 font-semibold uppercase">
                    Yes, Sure!
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4 px-3">
        {activeTab === "profile" && (
          <BasicDetails
            basicDetails={basicDetails}
            base64Avatar={base64Avatar}
          />
        )}
        {activeTab === "test-drives" && (
          <div className="tab-content bg-white rounded-md lg:rounded-lg xl:rounded-2xl ">
            {/* Not a test drive booked div  */}
            <div className="p-[15px] lg:p-[30px] xl:p-[50px] hidden">
              <Image
                src={BtdImg}
                alt=""
                className="w-auto rounded-full m-auto"
              />
            </div>

            {/* book a test drive div  */}
            <div className="p-3 lg:p-4 xl:p-5 ">
              <div className="max-h-auto min-h-auto lg:max-h-[550px] lg:min-h-[550px] overflow-auto grid grid-cols-1 gap-y-4">
                <div>
                  {/* desktop view  */}
                  <div className="hidden lg:grid grid-cols-3 p-3 gap-3 xl:gap-5 bg-[#f3f3f3] rounded-md">
                    <Image src={AddBtdImg} alt="" className="w-auto" />
                    <div className="">
                      <h4 className="text-base lg:text-lg xl:text-xl font-medium">
                        Model: Kia Seltos
                      </h4>
                      <ul className="list-disc pl-6 mt-3 flex gap-7 items-center">
                        <li className="text-sm lg:text-base text-gray-600 font-semibold">
                          Petrol
                        </li>
                      </ul>
                      <p className="text-sm xl:text-base font-medium text-gray-600 mt-5">
                        Test Drive Scheduled ID: BT000142
                      </p>
                    </div>
                    <div>
                      <Link
                        href="/"
                        className="float-right flex items-center gap-2 text-base text-gray-600 hover:text-red-500"
                      >
                        Cancel Test Drive
                        <span className="bx bx-x text-xl bg-white rounded-full"></span>
                      </Link>
                    </div>
                  </div>
                  {/* mobile view  */}
                  <div className="grid lg:hidden grid-cols-1 p-0 md:p-3 gap-2 bg-transparent lg:bg-[#f3f3f3] rounded-sm">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-semibold">
                        Model: Kia Seltos
                      </h4>
                      <Link
                        href="/"
                        className="float-right flex items-center gap-2 text-base text-gray-600 hover:text-red-500"
                      >
                        <span className="hidden md:block">
                          Cancel Test Drive
                        </span>
                        <span className="bx bx-x text-lg bg-gray-500 text-white rounded-full"></span>
                      </Link>
                    </div>
                    <div className="flex gap-2 md:gap-3 items-center">
                      <Image
                        src={AddBtdImg}
                        alt=""
                        className="max-w-[120px] md:max-w-[200px]"
                      />
                      <p className="text-sm md:text-base font-medium text-gray-600">
                        Test Drive Scheduled ID: BT000142
                      </p>
                    </div>
                    <div className="">
                      <ul className="list-disc pl-6 flex gap-7 items-center">
                        <li className="text-sm lg:text-base text-gray-600 font-semibold">
                          Petrol
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
