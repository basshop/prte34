"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

export function Avatar(props: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full bg-gray-100"
      {...props}
    />
  );
}

export function AvatarImage(props: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      className="h-full w-full rounded-[inherit] object-cover"
      {...props}
    />
  );
}

export function AvatarFallback(props: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      className="flex h-full w-full items-center justify-center rounded-[inherit] bg-gray-300 text-gray-600"
      {...props}
    />
  );
}
