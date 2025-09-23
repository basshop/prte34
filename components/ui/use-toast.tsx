"use client";
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cn } from "@/lib/utils"; // ถ้ายังไม่มี ให้ใช้ classnames หรือเขียนฟังก์ชัน merge class

export const ToastProvider = ToastPrimitives.Provider;

interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  title: string;
  description?: string;
  open?: boolean;
}

export const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitives.Root>, ToastProps>(
  ({ className, title, description, ...props }, ref) => (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full max-w-sm items-center justify-between rounded-md border p-4 pr-8 shadow-lg bg-white border-gray-200",
        className
      )}
      {...props}
    >
      <div className="flex flex-col space-y-1">
        <ToastPrimitives.Title className="font-semibold text-sm">{title}</ToastPrimitives.Title>
        {description && <ToastPrimitives.Description className="text-sm text-gray-500">{description}</ToastPrimitives.Description>}
      </div>
      <ToastPrimitives.Close className="absolute right-2 top-2 rounded-md opacity-70 hover:opacity-100">✕</ToastPrimitives.Close>
    </ToastPrimitives.Root>
  )
);
Toast.displayName = "Toast";

export const ToastViewport = () => (
  <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-50 flex w-96 max-w-full flex-col p-4 gap-2 m-0 list-none outline-none" />
);
