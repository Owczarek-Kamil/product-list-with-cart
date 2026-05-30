const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function formatPrice(price: number) {
  return formatter.format(price);
}
