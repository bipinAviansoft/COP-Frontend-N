import { fetchData } from "@/lib/fetch";
import CitySelectionModal from "../modals/city-selection-modal";
import AuthController from "../auth-controller";

export default async function HeaderDataFetchWrapper({ children }) {
  const [cities, accountData] = await Promise.all([
    fetchData("/city"),
    fetchData("/user"),
  ]);

  let wishlistData = [];

  if (accountData) {
    wishlistData = await fetchData("/wishlist");
  }

  return ( 
    <>
      <CitySelectionModal cities={cities} />
      <AuthController accountData={accountData} wishlistData={wishlistData} />
      {children}
    </>
  );
}
