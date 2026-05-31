import formatPrice from "../../utils/formatters";

export default function OrderTotal({ cartTotal }: { cartTotal: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-ink-primary">Order total</span>{" "}
      <span className="text-2xl font-bold text-ink-primary">{formatPrice(cartTotal)}</span>
    </div>
  );
}
