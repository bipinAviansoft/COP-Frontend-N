import { useSelector } from "react-redux";

export default function useAllowTestDrive() {
  const { city: selectedCity, citiesList } = useSelector((state) => state.city);
  const allowedCities = process.env.NEXT_PUBLIC_ALLOW_TESTDRIVE.split(",");

  const selectedCityName = citiesList?.find(
    (city) => city?.id === selectedCity
  )?.city_name;

  const allowTestDrive = allowedCities.includes(selectedCityName);

  return allowTestDrive;
}
