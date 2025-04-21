export function calculateEMI(
  exShowroomPrice,
  interestRate = 9,
  loanPeriod = 60,
  downPaymentPercent = 5
) {
  // Calculate Down Payment
  const downPayment = (downPaymentPercent / 100) * exShowroomPrice;

  // Loan Amount after Down Payment
  const loanAmount = exShowroomPrice - downPayment;

  // Monthly Interest Rate
  const monthlyInterestRate = interestRate / 100 / 12;

  // EMI Formula: E = [P * r * (1+r)^n] / [(1+r)^n - 1]
  const emi =
    (loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, loanPeriod)) /
    (Math.pow(1 + monthlyInterestRate, loanPeriod) - 1);

  const emt = new Intl.NumberFormat("en-IN").format(emi.toFixed(2));

  return `₹ ${emt}`; // Return EMI rounded to 2 decimal places
}
