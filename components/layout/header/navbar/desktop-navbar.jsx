import Button from "@/components/ui/button";
import useAllowTestDrive from "@/hooks/use-allow-test-drive";
import CityProtectedLink from "../../city-protected-link";
import Navbar from "./navbar";

export default function DesktopNavbar() {
  const allowTestDrive = useAllowTestDrive();

  return (
    <div className="bg-white">
      <div className="container hidden lg:block py-2.5">
        <div className="hidden lg:flex justify-between items-center">
          <Navbar />
          {allowTestDrive && (
            <Button
              animated
              asChild
              className="uppercase text-sm px-6 tracking-wide"
            >
              {/* <CityProtectedLink href="/test-drive">
                Book A Test Drive
              </CityProtectedLink> */}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
