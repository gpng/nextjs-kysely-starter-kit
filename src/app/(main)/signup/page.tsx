'use client';

import FormButton from '@/app/(main)/components/form/form-button';
import { buttonVariants } from '@/app/(main)/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(main)/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/(main)/components/ui/form';
import { Input } from '@/app/(main)/components/ui/input';
import { useToast } from '@/app/(main)/components/ui/use-toast';
import { SIGN_IN_ROUTE } from '@/app/(main)/routes';
import { createUser } from '@/app/(main)/signup/actions';
import { SignupActionError } from '@/app/(main)/signup/models/signup-models';
import useBoolean from '@/lib/hooks/use-boolean';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type formValues = z.infer<typeof formSchema>;

const SignupPage: FC = () => {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useBoolean();

  const handleFormAction = async () => {
    const valid = await form.trigger();

    if (!valid) return;

    const { email, password } = form.getValues();

    const res = await createUser({ email, password });

    if (res.error) {
      switch (res.error) {
        case SignupActionError.InvalidEmailOrPassword: {
          toast({
            title: 'Error',
            description: 'Invalid email or password',
            variant: 'destructive',
          });
          return;
        }
        default: {
          toast({
            title: 'Error',
            description: 'Something went wrong, please try again.',
            variant: 'destructive',
          });
          return;
        }
      }
    }

    await signIn('credentials', {
      email: email,
      password: password,
      callbackUrl: searchParams?.get('callbackUrl') || '/',
    });
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Already registered?{' '}
            <Link
              className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
              href={{
                pathname: SIGN_IN_ROUTE,
                query: searchParams?.toString(),
              }}
            >
              Sign in instead.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={handleFormAction} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={isPasswordVisible ? 'text' : 'password'}
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          onClick={setIsPasswordVisible.toggle}
                        >
                          {isPasswordVisible ? (
                            <EyeIcon className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeOffIcon className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormButton type="submit">Submit</FormButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
