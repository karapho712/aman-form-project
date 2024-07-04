export const discountPrice = (
  price: number,
  discount: number
) => {
  const discountedPrice = price * (1 - discount / 100);
  return isNaN(discountedPrice) ? 0 : discountedPrice;
};
