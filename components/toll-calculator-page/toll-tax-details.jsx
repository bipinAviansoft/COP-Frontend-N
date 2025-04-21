import Button from "../ui/button";

export default function TollTaxDetails() {
  return (
    <div className="bg-white shadow-md rounded-2xl max-h-[705px] overflow-auto m-4">
      <div className="flex justify-end items-center mt-3 mb-3 mr-3 md:mt-7 md:mb-4 md:mr-5 gap-3">
        <Button className="bg-[#d2d2d547] text-gray-500">
          Download PDF <i className="bx bx-down-arrow-alt text-2xl"></i>
        </Button>
        <button className="bg-[#d2d2d547] text-gray-500 p-2 flex items-center justify-center rounded-md">
          <i className="bx bx-x text-2xl"></i>
        </button>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-lg xl:text-2xl">
              Toll on this Route
            </th>
            <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-base xl:text-xl text-gray-600 ">
              One way{" "}
            </th>
            <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-base xl:text-xl text-gray-600 ">
              Return
            </th>
            <th className="text-left px-3 py-2 xl:px-5 xl:py-3 font-semibold whitespace-nowrap lg:text-base xl:text-xl text-gray-600 ">
              Monthly
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-3 py-2 xl:px-5 xl:py-3 text-primary-lighter text-sm text-left lg:text-base xl:text-lg font-semibold flex flex-col gap-1">
              Bhatia Toll Plaza
              <span className="text-xs lg:text-sm xl:text-base text-gray-500">
                Exit: GJ SH 168{" "}
              </span>
            </td>
            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
              ₹135
            </td>
            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
              ₹135
            </td>
            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
              ₹135
            </td>
          </tr>
          <tr>
            <td className="px-3 py-2 xl:px-5 xl:py-3 text-primary-lighter text-sm text-left lg:text-base xl:text-lg font-semibold flex flex-col gap-1 ">
              Bhatia Toll Plaza
              <span className="text-xs lg:text-sm xl:text-base text-gray-500">
                Exit: GJ SH 168{" "}
              </span>
            </td>
            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
              ₹135
            </td>
            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
              ₹135
            </td>
            <td className="px-3 py-2 xl:px-5 xl:py-3 lg:text-base xl:text-lg text-gray-500">
              ₹135
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
