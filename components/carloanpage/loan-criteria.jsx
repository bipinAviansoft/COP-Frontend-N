export default function LoanCriteria() {
  return (
    <>
      <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-primary-lighter"> Car Loan Approval Criteria </h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 mt-5 lg:mt-12 gap-5 lg:gap-8">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 text-base lg:text-lg xl:text-xl font-semibold">
            <i className="bx bx-shopping-bag text-xl"></i>Eligibility for Salaried Individuals:
          </div>
          <ul className="list-disc pl-7 lg:pl-8 mt-2 lg:mt-3">
            <li className="mb-3 mt-2 lg:mt-4 font-medium text-gray-500 text-sm md:text-base">Minimum age of 21 years and maximum age of 60 years at loan maturity.</li>
            <li className="font-medium text-gray-500 text-sm md:text-base">Employed with a recognised company or organisation for a specified number of years</li>
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="flex items-center gap-2 text-base lg:text-lg xl:text-xl font-semibold">
            <i className="bx bxs-user-check text-xl"></i>Eligibility for Self-Employed Individuals:
          </div>
          <ul className="list-disc pl-7 lg:pl-8 mt-2 lg:mt-3">
            <li className="mb-3 mt-2 lg:mt-4 font-medium text-gray-500 text-sm md:text-base">Minimum age of 21 years and maximum age of 65 years at loan maturity.</li>
            <li className="font-medium text-gray-500 text-sm md:text-base">Engaged in a profitable business or profession for a specified number of years.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
