import Form from 'next/form';

import { Input } from './ui/input';
import { Label } from './ui/label';

export function AuthForm({
  action,
  children,
  defaultEmail = '',
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-foreground"
        >
          Email Address
        </Label>

        <Input
          id="email"
          name="email"
          className="h-11"
          type="email"
          placeholder="user@example.com"
          autoComplete="email"
          required
          autoFocus
          defaultValue={defaultEmail}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Password
        </Label>

        <Input
          id="password"
          name="password"
          className="h-11"
          type="password"
          required
        />
      </div>

      {children}
    </Form>
  );
}
