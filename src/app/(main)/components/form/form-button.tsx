'use client';

import { Button, ButtonProps } from '@/app/(main)/components/ui/button';
import { FC } from 'react';
import { useFormStatus } from 'react-dom';

export const FormButton: FC<ButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return <Button {...props} isLoading={!!pending} />;
};

export default FormButton;
