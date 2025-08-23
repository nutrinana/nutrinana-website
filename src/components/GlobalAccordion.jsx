"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * GlobalAccordion component that renders an accessible, stylised accordion.
 *
 * Utilises the ShadCN Accordion UI component library.
 *
 * @component
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
                    <AccordionTrigger className="font-heading text-left text-xl font-semibold">
                        {/* Accordion header */}
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="font-body space-y-4 text-base text-black">
                        {/* Optional subtitle, displayed only when item is expanded */}
                        {item.subtitle && (
                            <div className="font-heading text-lg font-semibold text-black">
                                {item.subtitle}
                            </div>
                        )}
                        {/* Accordion content */}
                        <div className="mb-4">{item.content}</div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
