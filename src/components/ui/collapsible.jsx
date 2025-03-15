"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

// Inline CSS for sliding animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes slideDown {
    from {
        max-height: 0;
        opacity: 0;
    }
    to {
        max-height: 1000px; /* Adjust as needed */
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        max-height: 1000px; /* Adjust as needed */
        opacity: 1;
    }
    to {
        max-height: 0;
        opacity: 0;
    }
}

.collapsible-content-enter {
    animation: slideDown 0.5s forwards;
}

.collapsible-content-exit {
    animation: slideUp 0.5s forwards;
}
`;
document.head.appendChild(style);