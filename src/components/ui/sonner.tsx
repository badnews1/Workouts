"use client";

import { Toaster as Sonner } from "sonner@2.0.3";

const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      expand={false}
      closeButton={false}
      duration={4000}
      gap={12}
    />
  );
};

export { Toaster };
