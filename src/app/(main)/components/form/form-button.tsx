'use client';

import { Button, type ButtonProps } from '@/app/(main)/components/ui/button';
import { type FC } from 'react';
import { useFormStatus } from 'react-dom';

export const FormButton: FC<ButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return <Button {...props} isLoading={!!pending} />;
};

export default FormButton;
