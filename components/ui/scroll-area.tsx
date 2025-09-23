"use client"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

export function ScrollArea({ children }: { children: React.ReactNode }) {
  return (
    <ScrollAreaPrimitive.Root className="relative overflow-hidden rounded-md border border-gray-200">
      <ScrollAreaPrimitive.Viewport className="h-48 w-full rounded-md">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar
        className="flex select-none touch-none p-0.5 bg-gray-200 transition-colors duration-150 ease-out hover:bg-gray-300"
        orientation="vertical"
      >
        <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-gray-500" />
      </ScrollAreaPrimitive.Scrollbar>
      <ScrollAreaPrimitive.Corner className="bg-gray-200" />
    </ScrollAreaPrimitive.Root>
  )
}
