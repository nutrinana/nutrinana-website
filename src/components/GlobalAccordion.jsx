"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GlobalAccordion({ items }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger className="text-xl font-bold font-heading text-left">
                        {/* Accordion header */}
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-body text-black space-y-4">
                        {/* Optional subtitle, displayed when open */}
                        {item.subtitle && (
                            <div className="text-lg font-bold font-heading text-black">
                                {item.subtitle}
                            </div>
                        )}
                        {/* Accordion content */}
                        <div>{item.content}</div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}