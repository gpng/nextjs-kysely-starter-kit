'use client';

import { signIn } from '@/app/actions/auth';
import { Button, buttonVariants } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { useToast } from '@/app/components/ui/use-toast';
import { SIGN_UP_ROUTE } from '@/app/routes';
import useBoolean from '@/lib/hooks/use-boolean';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type formValues = z.infer<typeof formSchema>;

const SigninPage = () => {
  const searchParams = useSearchParams();

  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useBoolean();
  const [isLoading, setIsLoading] = useBoolean();

  const { toast } = useToast();

  const handleSubmit = async (values: formValues) => {
    setIsLoading.on();

    const { email, password } = values;

    const err = await signIn(email, password);

    if (err) {
      toast({
        title: 'Error',
        description: err,
        variant: 'destructive',
      });

      setIsLoading.off();
      return;
    }

    window.location.href = searchParams?.get('callbackUrl') || '/';
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Not registered?{' '}
            <Link
              className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
              href={{
                pathname: SIGN_UP_ROUTE,
                query: searchParams?.toString(),
              }}
            >
              Sign up instead.
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
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
                          autoComplete="current-password"
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
              <Button type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
