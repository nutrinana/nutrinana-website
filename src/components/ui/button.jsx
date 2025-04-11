import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        green:
          "border border-white bg-[var(--color-green)] text-primary-foreground shadow-xs transition-transform duration-250 ease-in-out hover:scale-110 hover:border-2",
        greenOutlined:
          "border border-[var(--color-raisin)] bg-[var(--color-green)] text-primary-foreground shadow-xs transition-transform duration-250 ease-in-out hover:scale-110 hover:border-2",
        yellow:
          "border border-primary bg-[var(--color-light-yellow)] text-[var(--color-raisin)] shadow-xs transition-transform duration-250 ease-in-out hover:scale-110 hover:border-2",
        pink:
          "border border-white bg-[var(--color-pink)] text-primary-foreground shadow-xs transition-transform duration-250 ease-in-out hover:scale-110 hover:border-2",
        pinkOutlined:
          "border border-[var(--color-raisin)] bg-[var(--color-pink)] text-primary-foreground shadow-xs transition-transform duration-250 ease-in-out hover:scale-110 hover:border-2",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        grey:
          "border border-[var(--color-raisin)] bg-[var(--color-grey)] text-[var(--color-raisin)] shadow-xs transition-transform duration-250 ease-in-out hover:scale-110 hover:border-2",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
          // "border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: 
          "hover:bg-accent hover:text-accent-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline",
        arrow:
          "w-4 h-8 p-0 text-base font-medium bg-transparent text-[var(--color-raisin)] hover:text-white transition-colors",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        smaller: "w-30 h-10",
        larger: "w-40 h-10", 
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
