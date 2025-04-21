"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/button";
import InputWithIcon from "../ui/input-with-icon";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import DelearRadioGroup from "./delear-radio-group";
import EmailVerificationModal from "./email-verification-modal";
import { sendRequest } from "@/lib/fetch-client";
import { openAuthModal } from "@/store";
import { authStages } from "@/data/constants";
import { useBookTestDriveCtx } from "@/contexts/book-test-drive-context";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LocationSearchMap from "./google-search-places";

const TIME_OF_PURCHASE_OPTIONS = [
  {
    value: "immediate",
    label: "Immediate",
  },
  {
    value: "within1Month",
    label: "Within 1 Month",
  },
  {
    value: "within3Month",
    label: "Within 3 Month",
  },
  {
    value: "within6Month",
    label: "Within 6 Month",
  },
];

const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function PersonalDetailsForm() {
  const dispatch = useDispatch();

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState(null);
  // const [selectedAddress, setSelectedAddress] = useState('');

  const changeOnHandleLocation = (location) => {
    setSelectedLocation(location);
  };

  const changeOnHandleAddress = (addressValue) => {
    setAddress(addressValue);
  };

  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [showMobileVerificationDialog, setShowMobileVerificationDialog] =
    useState(false);
  const [showEmailVerificationDialog, setShowEmailVerificationDialog] =
    useState(false);

  const [timeOfPurchase, setTimeOfPurchase] = useState("");

  const nameRef = useRef();
  const mobileNoRef = useRef();
  const emailRef = useRef();

  const {
    brand,
    model,
    validationErrors: vehicleFormErrors,
    setValidationErrors: setVehicleValidationsErrors,
  } = useBookTestDriveCtx();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (mobileNoRef.current) {
      setIsMobileVerified(true);
      mobileNoRef.current.value = user?.mobile;
    }
  }, [user]);

  const handleMobileVerificationClick = async () => {
    const mobile = mobileNoRef.current?.value;
    if (mobile && mobile.length === 10) {
      try {
        const response = await sendRequest("login/send-otp", {
          mobile,
        });
        dispatch(
          openAuthModal({
            mobile,
            stage: authStages.OTP_VERFICATION,
            allowEdit: false,
          })
        );
      } catch (e) {
        console.error(e.message);
      }
    } else {
      setValidationErrors((prev) => ({
        ...prev,
        mobile: "Please enter valid mobile no.",
      }));
    }
  };

  const handleEmailVerificationClick = async () => {
    const email = emailRef.current?.value;
    if (email && validEmailRegex.test(email)) {
      try {
        const response = await sendRequest("mail/send-otp", {
          email,
        });
        showMobileVerificationDialog(true);
      } catch (e) {
        console.error(e.message);
      }
      setShowEmailVerificationDialog(true);
    } else {
      setValidationErrors({ email: "Please enter valid email" });
    }
  };

  const handleNameChange = () =>
    setValidationErrors((prev) => ({ ...prev, name: "" }));

  const handleMobileChange = () =>
    setValidationErrors((prev) => ({ ...prev, mobile: "" }));

  const handleEmailChange = () =>
    setValidationErrors((prev) => ({ ...prev, email: "" }));

  const handleVerification = () => setIsEmailVerified(true);

  const handleSubmit = () => {
    if (!brand.brand_id) {
      setVehicleValidationsErrors((prev) => ({
        ...prev,
        brand: "Brand is required",
      }));
    }

    if (!model.id) {
      setVehicleValidationsErrors((prev) => ({
        ...prev,
        model: "Model is required",
      }));
    }

    if (!nameRef?.current?.value) {
      setValidationErrors((prev) => ({ ...prev, name: "Name is required" }));
    }

    if (!mobileNoRef?.current?.value) {
      setValidationErrors((prev) => ({
        ...prev,
        mobile: "Mobile No. is required",
      }));
    }

    if (!emailRef?.current?.value) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
    }

    if (!isMobileVerified) {
      setValidationErrors((prev) => ({
        ...prev,
        mobile: "Please verify your mobile no.",
      }));
    }

    if (!isEmailVerified) {
      setValidationErrors((prev) => ({
        ...prev,
        email: "Please verify your email",
      }));
    }

    if (!address) {
      setValidationErrors((prev) => ({
        ...prev,
        address: "Address is required",
      }));
    }
  };

  return (
    <>
      <EmailVerificationModal
        isOpen={showEmailVerificationDialog}
        setIsOpen={setShowEmailVerificationDialog}
        email={emailRef.current?.value}
        onVerified={handleVerification}
      />
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm lg:text-base font-semibold">
            Personal Details
          </h4>
          <div>
            <InputWithIcon
              iconClass="bx bx-user text-xl"
              placeholder="Your Name"
              ref={nameRef}
              onChange={handleNameChange}
            />
            <span className="text-sm text-destructive font-medium">
              {validationErrors?.name}
            </span>
          </div>
          <div className="flex flex-col gap-y-1">
            <div className="flex relative">
              <InputWithIcon
                ref={mobileNoRef}
                iconClass="bx bx-phone text-xl"
                placeholder="Enter Phone No."
                className="pr-20"
                type="number"
                readOnly={user?.mobile}
                onChange={handleMobileChange}
              />
              {user?.mobile ? (
                <i className="bx bxs-check-circle text-2xl text-green-500 absolute right-2 top-1/2 -translate-y-1/2"></i>
              ) : (
                <Button
                  variant="ghost"
                  className="absolute text-xs text-primary-lighter right-0 h-full"
                  onClick={handleMobileVerificationClick}
                >
                  Verify
                </Button>
              )}
            </div>
            <span className="text-sm text-destructive font-medium">
              {validationErrors?.mobile}
            </span>
          </div>

          <div className="flex flex-col gap-y-1">
            <div className="flex relative">
              <InputWithIcon
                ref={emailRef}
                iconClass="bx bx-envelope text-xl"
                placeholder="Enter Email ID"
                className="pr-20"
                onChange={handleEmailChange}
                type="email"
                readOnly={isEmailVerified}
              />
              {isEmailVerified ? (
                <i className="bx bxs-check-circle text-2xl text-green-500 absolute right-2 top-1/2 -translate-y-1/2"></i>
              ) : (
                <Button
                  variant="ghost"
                  className="absolute text-xs text-primary-lighter right-0 h-full"
                  onClick={handleEmailVerificationClick}
                >
                  Verify
                </Button>
              )}
            </div>
            <span className="text-sm text-destructive font-medium">
              {validationErrors?.email}
            </span>
          </div>
          <div className="w-full">
            <Dialog
              open={isAddressModalOpen}
              onOpenChange={setIsAddressModalOpen}
            >
              <DialogTrigger className="flex items-center text-sm w-full border border-[#e5e5e5] rounded-md relative flex justify-start gap-x-4 h-auto py-[0.5rem] pl-10 text-gray-darker">
                <i className="absolute bx bx-plus text-xl left-2"></i>
                <span>Add Address for Test Drive</span>
              </DialogTrigger>
              <DialogContent className="max-w-[700px] w-full">
                <DialogHeader className="mb-2">
                  <DialogTitle>Address</DialogTitle>
                </DialogHeader>
                <LocationSearchMap
                  selectedLocation={selectedLocation}
                  changeOnHandleLocation={changeOnHandleLocation}
                  selectedAddress={address}
                  changeOnHandleAddress={changeOnHandleAddress}
                />
              </DialogContent>
            </Dialog>
            <span className="text-sm text-destructive font-medium">
              {validationErrors?.address}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm font-medium">Estimated Time of Purchase:</p>
          <ToggleGroup
            className="justify-start gap-2.5 flex-wrap"
            type="single"
            value={timeOfPurchase || TIME_OF_PURCHASE_OPTIONS[0].value}
            onValueChange={(value) => setTimeOfPurchase(value)}
          >
            {TIME_OF_PURCHASE_OPTIONS.map((type) => (
              <ToggleGroupItem
                className="text-xs md:text-sm rounded-lg px-4 py-2 h-auto bg-gray-400 text-white data-[state=on]:bg-primary-lighter data-[state=on]:text-white font-normal hover:bg-gray-600 hover:text-white"
                key={type.value}
                value={type.value}
              >
                {type.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <DelearRadioGroup brand={brand?.brand_name} />

        <Button animated className="uppercase w-full" onClick={handleSubmit}>
          Book A Test Drive
        </Button>
      </div>
    </>
  );
}
