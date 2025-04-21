import FuelBanner from "@/components/fuel-calculator-page/fuel-banner";
import FuelCalculatorDrawer from "@/components/fuel-calculator-page/fuel-calculator-drawer";
import DevBug from "@/components/ui/dev-bug";
import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "fuel-calculator" };

  const data = await fetchMetaData(bodyData);

  return data;
}

export default function Page() {
  return (
    <section className="fuel_cal_section relative lg:py-0 py-5">
      <FuelCalculatorDrawer />
    </section>
  );
}
