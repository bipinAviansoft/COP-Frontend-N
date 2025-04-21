import HighwayTips from "@/components/toll-calculator-page/highway-tips";
import TollCalculatorDrawer from "@/components/toll-calculator-page/tol-calculator-drawer";
import TollTaxDetails from "@/components/toll-calculator-page/toll-tax-details";
import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "toll-calculator" };

  const data = await fetchMetaData(bodyData);

  return data;
}

export default function Page() {
  return (
    <div>
      <section className="relative lg:py-0 py-5 h-auto lg:h-[calc(100vh-110px)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
          <TollCalculatorDrawer />
          <TollTaxDetails />
        </div>
      </section>

      <section className="py-10 lg:py-20 bg-[#e3eef3] mt-12 lg:mt-0">
        <div className="container relative">
          <HighwayTips />
        </div>
      </section>
    </div>
  );
}
