"use client";

import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import InputWithIcon from "@/components/ui/input-with-icon";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { setCities, setCity, closeCityModal } from "@/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CitySelectionModal({ cities }) {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCities(cities));
  }, [dispatch, cities]);

  const { city, isModalOpen, refresh, redirectTo, allowCloseWithoutSelection } =
    useSelector((state) => state.city);

  const handleCitySelection = async (id) => {
    const cookieOptions = {
      path: "/",
      secure: true,
      sameSite: "Lax",
    };

    if (process.env.NODE_ENV == "production") {
      // cookieOptions.domain = ".aviansoft.work";
      // cookieOptions.domain = ".vercel.app";
      cookieOptions.secure = true;
      cookieOptions.sameSite = "None";
    }

    console.log("cookieOptions: ", cookieOptions);
    console.log("city find: ");

    Cookies.set("city", id, cookieOptions);

    dispatch(setCity(id));
    // localStorage.setItem("selectedCity", id);
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500)
    );
    if (refresh) {
      router.refresh();
    } else if (redirectTo) {
      router.push(redirectTo);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = cities.filter((city) =>
    city.city_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => dispatch(closeCityModal())}
      handleCloseClick={() => {
        dispatch(closeCityModal());
      }}
    >
      <DialogContent
        className="w-[90%] md:max-w-lg lg:max-w-2xl rounded-lg h-[70dvh] overflow-y-auto flex flex-col"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        hideCloseButton={!allowCloseWithoutSelection}
      >
        <DialogHeader>
          <DialogTitle className="text-left">Choose Your City</DialogTitle>
          <span className="hidden">
            <DialogDescription>
              This modal is used for allowing user to select a city.
            </DialogDescription>
          </span>
        </DialogHeader>
        <div className="grow space-y-4 md:space-y-6">
          <InputWithIcon
            iconClass="bx bx-search text-xl"
            placeholder="Enter your city"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="md:grid md:grid-cols-2 md:gap-x-4 space-y-4 md:space-y-0">
            <div className="order-1">
              <h3 className="text-gray-darker mb-2">Popular Cities</h3>
              <ToggleGroup
                type="single"
                className="flex-wrap justify-start gap-2 pr-2"
                value={city}
                onValueChange={(cityId) => handleCitySelection(cityId)}
              >
                {cities
                  .filter((city) => city.isPopular)
                  .map((city) => {
                    const { id, city_name } = city;
                    return (
                      <ToggleGroupItem
                        key={id}
                        value={id}
                        className="bg-[#E8EFFC] text-gray-darker"
                      >
                        {city_name}
                      </ToggleGroupItem>
                    );
                  })}
              </ToggleGroup>
            </div>
            <div className="order-0">
              <h3 className="text-gray-darker mb-2">Other Cities</h3>
              {filteredCities?.length > 0 && (
                <ul className="flex flex-col h-60 md:h-80 overflow-y-auto pr-1">
                  {filteredCities.map((city) => {
                    const { id, city_name } = city;

                    return (
                      <li key={id}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleCitySelection(id)}
                        >
                          {city_name}
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              )}
              {filteredCities.length === 0 && (
                <div className="flex flex-col h-60 md:h-80 justify-center items-center text-sm">
                  <p>No city found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
