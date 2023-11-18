import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { FC } from 'react';

const outerVariants = cva('flex', {
  variants: {
    variant: {
      default: '',
      full: 'min-h-screen',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const innerVariants = cva('mx-auto w-full max-w-[60ch] px-4 py-2');

interface Props extends VariantProps<typeof outerVariants> {
  children: React.ReactNode;
  innerClassName?: string;
}

const Container: FC<Props> = ({ children, innerClassName, variant }) => {
  return (
    <div
      className={cn(
        outerVariants({
          variant,
        }),
      )}
    >
      <div
        className={cn(
          innerVariants({
            className: innerClassName,
          }),
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
