import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmed — OEA Perfumery",
  description: "Your order has been placed.",
};

export default function CheckoutSuccessPage() {
  return null; // client component in CheckoutPage handles UI; this is a route target
}
