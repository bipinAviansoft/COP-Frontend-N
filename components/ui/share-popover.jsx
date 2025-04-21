import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "@/lib/utils";

export default function SharePopover({ triggerClassName, locationLink }) {
  const [isOpen, setIsOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    return () => setLinkCopied(false);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(locationLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          "flex items-center justify-center rounded-sm size-8",
          triggerClassName,
          isOpen ? "bg-theme-black rounded-full" : "bg-[#74AFC9] rounded-sm"
        )}
      >
        {isOpen ? (
          <i className="bx bx-x text-xl text-white"></i>
        ) : (
          <i className="bx bxs-share bx-flip-horizontal text-xl text-white"></i>
        )}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        className="w-auto bg-transparent border-none shadow-none p-0 "
      >
        <ul className="list-none flex flex-col gap-1 md:gap-2 mt-1">
          <li className="size-8 lg:size-9 flex items-center justify-center cursor-pointer">
            <a
              className="grow block h-full"
              href={`https://wa.me/?text=Check out this page: ${locationLink}`}
              target="_blank"
              rel="noreferrer"
            >
              <i className="text-lg lg:text-2xl bx bxl-whatsapp  bg-white rounded-full text-[#075e54] w-full h-full flex items-center justify-center shadow-[0.5px_0.87px_4px_#2c2c2cba] "></i>
            </a>
          </li>
          <li className="size-8 lg:size-9 flex md:hidden items-center justify-center cursor-pointer">
            <a
              className="grow block h-full"
              href={`sms:?body=Check%20out%20this%20page:%20${locationLink}`}
              target="_blank"
              rel="noreferrer"
            >
              <i className="text-lg lg:text-2xl bx bx-link-alt bx bxs-message-rounded-dots  bg-white w-full h-full flex items-center justify-center rounded-full text-[#00b6fe] shadow-[0.5px_0.87px_4px_#2c2c2cba]"></i>
            </a>
          </li>
          <li className="size-8 lg:size-9 flex items-center justify-center cursor-pointer">
            {linkCopied ? (
              <i className="text-lg lg:text-2xl bx bx-check-double bg-white rounded-full text-[#023452] w-full h-full flex items-center justify-center shadow-[0.5px_0.87px_4px_#2c2c2cba] animate-beat"></i>
            ) : (
              <i
                className="text-lg lg:text-2xl bx bx-link-alt bg-white rounded-full text-[#023452] w-full h-full flex items-center justify-center shadow-[0.5px_0.87px_4px_#2c2c2cba]"
                onClick={handleCopyLink}
              ></i>
            )}
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}
