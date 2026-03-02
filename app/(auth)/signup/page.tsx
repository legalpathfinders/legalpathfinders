'use client';

import NavigationStack from '@/lib/NavigationStack';
import SignupForm from './signup-form/page';
import Verification from './verification/page';

const signupNavLink = {
  signup_form: SignupForm,
  verification: Verification,
};

export default function SignupPage() {
  return (
    <NavigationStack
      id="signup-stack"
      navLink={signupNavLink}
      entry="signup_form"
      transition="fade"
    />
  );
}
