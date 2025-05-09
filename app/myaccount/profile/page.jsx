export const dynamic = "force-dynamic";
import ProfileSection from "@/components/profile-page/profile-section";
import { fetchData } from "@/lib/fetch";
import { redirect } from "next/navigation";

export default async function Page() {
  const userData = await fetchData("/user");

  if (!userData) {
    redirect("/");
  }

  const { basicDetails, testDrives } = userData;

  return (
    <section className="container py-8 lg:py-12">
      <ProfileSection basicDetails={basicDetails} testDrives={testDrives} />
    </section>
  );
}
