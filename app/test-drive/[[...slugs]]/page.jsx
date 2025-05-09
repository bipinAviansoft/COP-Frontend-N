import PersonalDetailsForm from "@/components/test-drive/personal-details-form";
import VehicleSelectionForm from "@/components/test-drive/vehicle-selection-form";
import { Separator } from "@/components/ui/separator";
import BookTestDriveContextProvider from "@/contexts/book-test-drive-context";
import { fetchData, fetchMetaData } from "@/lib/fetch";

export async function generateMetadata({ params }) {
  const [brandSlug, modelSlug] = params.slugs || [];
  const bodyData = { page_name_slug: "book-test-drive" };

  const data = await fetchMetaData(bodyData);

  const canonicalUrl = `${process.env.NEXT_SITE_URL}/test-drive`;

  return {
    ...data,
    alternates: {
      canonical: canonicalUrl,
    },
  };

  // return data;
}

export default async function TestDrivePage({ params }) {
  const [brandSlug, modelSlug] = params.slugs || [];

  let brandModelsData = await fetchData("/brands?models=true");

  return (
    <>
      <div className="bg-[#f2f4f6]">
        <div className="container py-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <BookTestDriveContextProvider>
            <div className="p-4 md:p-4 border bg-white shadow rounded-lg lg:col-span-2">
              <h2 className="lg:text-lg uppercase text-primary-darker font-semibold">
                Book a Door-Step Test Drive Online
              </h2>
              <Separator className="my-4" />

              <VehicleSelectionForm
                brandModels={brandModelsData}
                brandSlug={brandSlug}
                modelSlug={modelSlug}
              />
            </div>
            <div className="p-4 md:p-4 border bg-white shadow rounded-lg overflow-y-auto max-h-[680px]">
              <PersonalDetailsForm />
            </div>
          </BookTestDriveContextProvider>
        </div>
      </div>
    </>
  );
}
