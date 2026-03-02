'use client';

import NavigationStack from '@/lib/NavigationStack';
import RequestReset from './request-reset/page';
import VerifyOtp from './verify-otp/page';
import ResetPassword from './reset-password/page';

const forgotPasswordNavLink = {
  request_reset: RequestReset,
  verify_otp: VerifyOtp,
  reset_password: ResetPassword,
};

export default function ForgotPasswordPage() {
  return (
    <NavigationStack
      id="forgot-password-stack"
      navLink={forgotPasswordNavLink}
      entry="request_reset"
      transition="fade"
    />
  );
}
