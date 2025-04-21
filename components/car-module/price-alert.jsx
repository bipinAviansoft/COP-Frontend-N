import alertImg from "@/public/images/alert_img.png";
import Image from "next/image";
import Button from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { fetchDataClient } from "@/lib/fetch-client";
import { useRouter } from "next/navigation";
import { openAuthModal } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PriceAlert({ isPriceAlertSet, brand, model }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    mutate: setPriceAlert,
    isPending,
    error,
  } = useMutation({
    mutationFn: () =>
      fetchDataClient(`brands/${brand}/${model}/set-price-alert`),
    onSuccess: () => {
      toast.success("Price alert set successfully!");
      router.refresh();
    },
  });

  const { user } = useSelector((state) => state.auth);

  const handleSetPriceAlertClick = () => {
    if (!user?.mobile) {
      dispatch(openAuthModal());
    } else {
      setPriceAlert();
    }
  };

  return (
    <div className="rounded-md bg-[url('/images/alert_img_bg.jpg')] bg-cover bg-center relative p-4 flex flex-col gap-y-4">
      <Image
        src={alertImg}
        alt="set price alert"
        className="w-20 md:w-24 lg:w-28 aspect-square absolute -top-10 right-0 -rotate-45"
      />
      <h4 className="text-lg font-bold">
        {isPriceAlertSet
          ? "You're all set for notification!"
          : "Never Miss a Deal!"}
      </h4>
      <p className="lg:w-2/3 text-sm text-gray-500">
        {isPriceAlertSet
          ? "Sit back and relax, you have successfully subscribed to receive alerts. Expect updates from us as soon as there are any price changes."
          : "Stay ahead of the game with our Price Alert feature! Simply set your Alert and we'll notify you the moment it's Best for you."}
      </p>
      {!isPriceAlertSet && (
        <Button
          className="self-start uppercase tracking-wide"
          animated
          disabled={isPending}
          onClick={handleSetPriceAlertClick}
        >
          {isPending ? (
            <i className="bx bx-loader-alt text-xl animate-spin"></i>
          ) : (
            "Set Price Alert"
          )}
        </Button>
      )}
    </div>
  );
}
