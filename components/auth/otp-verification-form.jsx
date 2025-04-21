"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authStages } from "@/data/constants";
import { sendRequest } from "@/lib/fetch-client";
import { convertSecondsToMin } from "@/lib/utils";
import { loginUserWithoutRequestingInfo, updateStage } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  otp: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OTPVerificationForm() {
  const [formError, setFormError] = useState("");
  const dispatch = useDispatch();
  const [secondsToResend, setSecondsToResend] = useState(60);
  const {
    mobile,
    refresh: refreshPage,
    allowEdit,
  } = useSelector((state) => state.auth);
  const { refresh } = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const intervalID = setInterval(() => {
      setSecondsToResend((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const onSubmit = (values) => verifyOTP({ ...values, mobile });

  const handleEditClick = () =>
    dispatch(updateStage({ stage: authStages.GET_MOBILE_NO }));

  const { mutate: verifyOTP, isPending: isVerifying } = useMutation({
    mutationFn: (data) => sendRequest("login/verify-otp", data),
    onSuccess: (data) => {
      const { contact_no: mobile, name, profile_pic: avatar } = data;
      const userData = { mobile: mobile?.substring(2, 13), name, avatar };
      dispatch(loginUserWithoutRequestingInfo(userData));
      if (refreshPage) {
        refresh();
      }
    },
    onError: (error) => {
      setFormError(error?.message);
    },
  });

  const { mutate: resendOTP, isPending: isResending } = useMutation({
    mutationFn: (data) => sendRequest("login/resend-otp", data),
    onSuccess: () => {
      setSecondsToResend(60);
    },
    onError: (error) => {
      setFormError(error?.message);
    },
  });

  const handleResetClick = () => resendOTP({ mobile: mobile });

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <h2 className="text-lg font-semibold leading-none tracking-tight">
          OTP Verification
        </h2>
        <p className="text-sm text-muted-foreground">
          Please enter the one-time password sent to your phone.
        </p>
      </div>
      <p className="text-sm font-medium flex items-center gap-x-2">
        <span>
          OTP Successfully sent to +91-
          <span className="underline underline-offset-4">{mobile}</span>
        </span>
        {allowEdit && (
          <Button variant="icon" className="p-0" onClick={handleEditClick}>
            <i className="bx bxs-edit text-lg text-muted-foreground"></i>
          </Button>
        )}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-4"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button animated type="submit">
            {isVerifying ? (
              <i className="bx bx-loader-alt text-2xl animate-spin"></i>
            ) : (
              "Verify OTP"
            )}
          </Button>
          <div className="flex justify-between text-sm">
            <p className="text-sm text-muted-foreground flex gap-x-2 items-center">
              Didn&apos;t recieve OTP?{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto overflow-visible origin-center"
                disabled={secondsToResend > 0}
                onClick={handleResetClick}
              >
                {isResending ? (
                  <i className="bx bx-loader-alt text-xl animate-spin"></i>
                ) : (
                  "Resend"
                )}
              </Button>
            </p>
            <p>{convertSecondsToMin(secondsToResend)}</p>
          </div>
        </form>
      </Form>
      {formError && (
        <p className="text-sm text-destructive font-medium">{formError}</p>
      )}
    </>
  );
}
