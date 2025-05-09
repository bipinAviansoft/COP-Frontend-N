"use client";

/* import loginImage from "@/public/images/login.webp"; */
import logo from "@/public/images/logo.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import AuthMobileForm from "@/components/auth/auth-mobile-form";
import OTPVerificationForm from "@/components/auth/otp-verification-form";
import { authStages } from "@/data/constants";
import { closeAuthModal } from "@/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function AuthModal() {
  const dispatch = useDispatch();
  const { isModalOpen, stage } = useSelector((state) => state.auth);

  return (
    <Dialog open={isModalOpen} onOpenChange={() => dispatch(closeAuthModal())}>
      <DialogContent className="w-4/5 max-w-[420px] p-6 rounded-lg">
        <div className="relative w-40 lg:w-52 aspect-4/1">
          <Image
            src={logo}
            alt="caronphone logo"
            fill
            className="object-contain"
          />
        </div>
        <DialogHeader>
          <span className="hidden">
            <DialogTitle>Title for modal</DialogTitle>
            <DialogDescription>
              Enter your mobile no. to recieve one time password!
            </DialogDescription>
          </span>
        </DialogHeader>
        {stage === authStages.GET_MOBILE_NO && <AuthMobileForm />}
        {stage === authStages.OTP_VERFICATION && <OTPVerificationForm />}
      </DialogContent>
    </Dialog>
  );
}
