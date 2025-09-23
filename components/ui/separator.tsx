"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import React from "react";

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    className={`bg-gray-200 ${className}`}
    {...props}
  />
));

Separator.displayName = SeparatorPrimitive.Root.displayName;
