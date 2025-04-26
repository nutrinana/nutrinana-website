"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

/** 
 * GlobalAccordion component that renders an accessible, stylised accordion.
 * Utilises the ShadCN Accordion UI component library.
 * 
 * @param {Array} items - Array of objects representing accordion items. Each item should contain:
 * - {string} title: The main title of the accordion item.
 * - {string} subtitle: Optional subtitle displayed below the title when open.
 * - {JSX.Element|string} content: The main content displayed when the item is expanded.
 * 
 * @returns {JSX.Element} A stylised accordion component.
 */
export default function GlobalAccordion({ items }) {
    return (
        // Render the accordion with a list of items, allowing single item expansion at a time
        <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                    {/* Accordion header trigger (click to expand/collapse) */}
                    <AccordionTrigger className="text-xl font-bold font-heading text-left">
                        {/* Accordion header */}
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-body text-black space-y-4">
                        {/* Optional subtitle, displayed only when item is expanded */}
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