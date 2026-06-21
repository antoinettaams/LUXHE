"use client";

import { useOrder } from "./OrderProvider";

export default function OrderButton({
  className = "btn btn-solid",
  children = "Commander",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { open } = useOrder();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
