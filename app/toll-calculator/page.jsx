import HighwayTips from "@/components/toll-calculator-page/highway-tips";
import TollCalculatorDrawer from "@/components/toll-calculator-page/tol-calculator-drawer";
import TollTaxDetails from "@/components/toll-calculator-page/toll-tax-details";
import { fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const bodyData = { page_name_slug: "toll-calculator" };

  const data = await fetchMetaData(bodyData);

  // return data;
  const canonicalUrl = `${process.env.NEXT_SITE_URL}/toll-calculator`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function Page() {
  return <TollCalculatorDrawer />;
}
