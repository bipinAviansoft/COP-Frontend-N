"use client";

import BasicDetailForm from "@/components/profile-page/basic-detail-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { setBasicDetails } from "@/store";
import { useDispatch, useSelector } from "react-redux";

export default function BasicDetailModal() {
  const dispatch = useDispatch();
  const { getBasicDetails, user } = useSelector((state) => state.auth);

  return (
    <Dialog
      open={getBasicDetails}
      onOpenChange={() => dispatch(setBasicDetails(user))}
    >
      <DialogContent className="w-4/5 max-w-[420px] p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
          <DialogDescription>
            Please provide some basic details allowing to serve you better!
          </DialogDescription>
        </DialogHeader>
        <BasicDetailForm basic />
      </DialogContent>
    </Dialog>
  );
}
