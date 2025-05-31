import Link from "next/link";
import Button from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import SharePopover from "./share-popover";

export default function StationAndDealerCard({
  title,
  description,
  address,
  contact,
  email,
  locationLink,
}) {
  return (
    <div className="grow w-full bg-white border-2 rounded-md flex flex-col">
      <div className="flex items-center justify-between border-b border-gray-200 p-3">
        <div>
          <h3 className="text-base font-semibold m-0">{title}</h3>
          {description && (
            <p className="text-sm font-semibold text-gray-darker">
              {description}
            </p>
          )}
        </div>

        <SharePopover locationLink={locationLink} />
      </div>

      <div className="grow flex flex-col justify-between">
        {address && (
          <div className="p-2.5 flex items-start gap-x-4 overflow-hidden">
            <span>
              <i className="bx bx-current-location text-theme-black text-base lg:text-lg"></i>
            </span>
            <span className="text-sm text-gray-700">{address}</span>
          </div>
        )}
        {contact && (
          <div className="p-2.5 flex items-center gap-x-4">
            <span className="flex items-center">
              <i className="bx bx bxs-phone text-theme-black text-base lg:text-lg"></i>
            </span>
            <span className="text-sm text-gray-700">{contact}</span>
          </div>
        )}
        {email && email.length > 0 && (
          <div className="p-2.5 flex gap-x-4 ">
            <span className="flex items-center">
              <i className="bx bxs-envelope text-theme-black text-base lg:text-lg"></i>
            </span>
            <ul>
              {email.map((mail) => (
                <li key={mail} className="text-sm text-gray-700">
                  {mail}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 flex justify-center p-2.5">
        <a
          href={locationLink}
          className="flex justify-center w-full"
          target="_blank"
          rel="noreferrer"
        >
          <Button animated className="w-[80%] font-semibold">
            Locate
          </Button>
        </a>
      </div>
    </div>
  );
}
