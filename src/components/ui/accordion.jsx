"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { CircleChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

import "@/styles/globals.css";

function Accordion({ className, ...props }) {
  // TODO: Adjust accordion size here. max-w-8xl is the largest allowed; max-w-6xl is suggested for layout consistency.
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("max-w-6xl mx-auto w-full", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-black first:border-t last:border-b", className)}
      {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 px-2 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}>
        {children}
        <CircleChevronDown
          strokeWidth={0.75}
          className="pointer-events-none size-8 shrink-0 text-white fill-black transition-transform duration-200 data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="AccordionContent data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm px-2"
      {...props}>
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
