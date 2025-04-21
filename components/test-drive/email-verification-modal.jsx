import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import Button from "../ui/button";
import logo from "@/public/images/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendRequest } from "@/lib/fetch-client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const FormSchema = z.object({
  otp: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function EmailVerificationModal({
  email,
  isOpen,
  setIsOpen,
  onVerified,
}) {
  const [formError, setFormError] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (values) => verifyOTP({ ...values, email });

  const { mutate: verifyOTP, isPending: isVerifying } = useMutation({
    mutationFn: (data) => sendRequest("mail/verify-otp", data),
    onSuccess: (data) => {
      setIsOpen(false);
      onVerified();
    },
    onError: (error) => {
      setFormError(error?.message);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <DialogTitle>Email Verification</DialogTitle>
          <DialogDescription>
            Please enter the one-time password sent to your email.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm font-medium flex items-center gap-x-2">
          <span>OTP Successfully sent to</span>
          <span className="underline underline-offset-4">{email}</span>
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
          </form>
        </Form>
        {formError && (
          <p className="text-sm text-destructive font-medium">{formError}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
