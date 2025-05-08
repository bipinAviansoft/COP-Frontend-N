import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import EmailSubscribeForm from "./email-subscribe-form";

export default function Footer() {
  return (
    <footer className="bg-[#f2f4f6] text-primary-darker pt-8">
      <section className="container pt-6 flex flex-col gap-y-6 lg:flex-row items-center lg:items-start">
        <div className="w-full lg:w-5/12">
          <div className="relative w-44 lg:w-64 aspect-5/1 mb-8">
            <Link href={"/"}>
              <Image
                src="/images/logo.png"
                alt="CarOnPhone: Drive Dreams Home"
                fill
                sizes="(max-width: 1024px) 176px, 256px"
              />
            </Link>
          </div>
          <EmailSubscribeForm />
        </div>
        <div className="w-full grow flex flex-wrap gap-x-16 gap-y-8 lg:px-2">
          <div className="lg:px-4 lg:order-1">
            <p className="text-lg lg:text-xl font-bold mb-4">Overview</p>
            <ul className="flex flex-col gap-y-3 text-sm lg:text-base">
              <li>
                <Link href="/" className="font-semibold">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/b2b-inquiry" className="font-semibold">
                  B2B Inquiry
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="font-semibold">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:px-4 lg:order-3">
            <p className="text-lg lg:text-xl font-bold mb-4">Others</p>
            <ul className="flex flex-col gap-y-3 text-sm lg:text-base">
              <li>
                <Link href="/privacy-policy" className="font-semibold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="font-semibold">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="font-semibold">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:px-4 lg:order-2">
            <p className="text-lg lg:text-xl font-bold mb-4">Contact Us</p>
            <ul className="flex flex-col gap-y-3 text-sm lg:text-base">
              <li>
                <Link
                  href="tel:+91 9723443555"
                  className="font-semibold flex items-center gap-x-2"
                >
                  <div className="bg-primary-gradient size-8 flex items-center justify-center text-white rounded-full">
                    <i className="bx bxs-phone text-xl"></i>
                  </div>
                  <span>+91 9723443555</span>
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:support@caronphone.com"
                  className="font-semibold flex items-center gap-x-2"
                >
                  <div className="bg-primary-gradient size-8 flex items-center justify-center text-white rounded-full">
                    <i className="bx bxs-envelope text-xl"></i>
                  </div>
                  <span>support@caronphone.com</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Separator className="my-6 bg-primary-darker h-[0.5px]" />
      <section className="container pb-6 flex flex-col items-center gap-y-3 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-x-3 lg:order-1">
          <span className="font-semibold text-sm">Follow Us: </span>
          <a
            href="https://www.facebook.com/CarOnPhone"
            className="bg-primary-gradient size-8 flex items-center justify-center text-white rounded-full"
          >
            <i className="bx bxl-facebook-circle text-xl"></i>
          </a>
          <a
            href="https://instagram.com/caronphoneindia"
            className="bg-primary-gradient size-8 flex items-center justify-center text-white rounded-full"
          >
            <i className="bx bxl-instagram text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/caronphone/"
            className="bg-primary-gradient size-8 flex items-center justify-center text-white rounded-full"
          >
            <i className="bx bxl-linkedin-square text-xl"></i>
          </a>
        </div>
        <span className="font-semibold text-sm">
          © {new Date().getFullYear()} CarOnPhone. All Rights Reserved
        </span>
      </section>
    </footer>
  );
}
