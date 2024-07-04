export const formatNumber = (numberString: number) => {
  const number = parseFloat(numberString.toString());

  const formattedNumber = new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "IDR",
  }).format(number);

  return formattedNumber;
};
