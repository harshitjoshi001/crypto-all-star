import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const buttonVariants = cva(
  'relative text-xl min-w-[140px] z-10 uppercase font-extrabold cursor-pointer text-white px-4',
  {
    variants: {
      variant: {
        default: 'custom',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  label?: string;
  icon?: boolean;
  isSecondary?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, icon, isSecondary = false, label, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, className })
        )}
        ref={ref}
        {...props}
      >
        
        
          <Image
            src={isSecondary ? '/images/secondary-btn.svg' : '/images/primary-btn.png'}
            alt="Button Logo"
            layout="fill"
            priority
             className="absolute inset-0 z-[-1]"
          />
        
        
          {/* {icon && <icon />} */}
        <span className='m-4'>{label}</span>
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
