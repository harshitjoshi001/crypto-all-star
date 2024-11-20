import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import Image from 'next/image';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          '',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      // size: {
      //   default: '',
      //   sm: 'rounded-md px-3 text-xs',
      //   lg: 'rounded-md px-8',
      //   icon: 'w-9',
      // },
    },
    defaultVariants: {
      variant: 'default',
      // size: 'default',
    },
  }
);

// Add the custom styles to a new variant or override a specific variant
const customButtonVariant = 'relative px-4 py-2 text-[18px] uppercase font-extrabold cursor-pointer text-white';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  label?: string;
  icon?: boolean;
  isSecondary?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, icon, isSecondary, label, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, className }),
          customButtonVariant
        )}
        ref={ref}
        {...props}
      >
        <Image
          src={isSecondary ? '/images/secondary-btn.svg' : '/images/primary-btn.svg'}
          alt="Logo"
          layout="fill"
          className="absolute z-[-1] inset-0 object-cover"
          priority
        />
        {/* {icon && <icon />} */}
        {label}
        </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
