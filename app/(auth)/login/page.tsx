'use client';

import NavigationStack from '@/lib/NavigationStack';
import LoginForm from './login-form/page';
import LoginVerification from './login-verification/page';

const loginNavLink = {
  login_form: LoginForm,
  login_verification: LoginVerification,
};

export default function LoginPage() {
  return (
    <NavigationStack
      id="login-stack"
      navLink={loginNavLink}
      entry="login_form"
      transition="fade"
    />
  );
}
