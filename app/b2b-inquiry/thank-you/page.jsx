export const dynamic = "force-dynamic";
export default function page() {
  return (
    <section className="">
      <div className="max-w-[1400px] mx-auto px-[15px]">
        <div className="text-center h-[60vh] flex flex-col items-center justify-center gap-[20px]">
          <img
            src="/images/thankyou-img.png"
            className="mx-auto max-w-[100%]"
            alt=""
          />
          <h1 className="text-[45px] leading-[55px] font-[700] m-0 ">
            THANK YOU!{" "}
          </h1>
          <p className="text-[16px] font-[400] leading-[24px] ">
            We will contact you shortly.
          </p>
        </div>
      </div>
    </section>
  );
}
