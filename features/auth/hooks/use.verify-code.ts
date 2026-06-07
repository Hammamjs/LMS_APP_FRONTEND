import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getObjectFromSessionStorage } from '@/shared/lib/session-storage.helper';
import { useVerifyResetPassword } from '../hooks/use.verify-reset-password';
import { useToast } from '@/shared/hooks';
import { useForgotPasswordAction } from '../hooks/use.forgot-password';
import { isResSent } from 'next/dist/shared/lib/utils';

export const useVerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);
  const [email, setEmail] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const { verifyCode, isLoading } = useVerifyResetPassword();
  const { toast } = useToast();

  const { sendResetCode, isLoading: isResending } = useForgotPasswordAction();

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = getObjectFromSessionStorage('resetEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    // Focus first input
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Countdown timer for resend
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // const newCode = [...code];
    // newCode[index] = value.slice(-1); // Only take last character
    // setCode(newCode);

    setCode((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newCode[index] = char;
    });
    setCode(newCode);

    // Focus last filled input or first empty one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    const fullCode = code.join('');
    if (fullCode.length !== 6) return;

    try {
      await verifyCode(fullCode, email);
      toast({ title: 'Code verified' });

      router.push('/reset-password');
    } catch (err) {
      toast({ title: 'Failed, request new code' });
      console.log(err);
    }
  };

  const handleResend = async () => {
    try {
      const res = await sendResetCode(email);

      toast({ title: res.message });

      setResendTimer(60);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Send reset code is failed';
      toast({ title: message });
      console.log(err);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  // Mask email for display
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : 'your email';

  return {
    code,
    resendTimer,
    inputRefs,

    // loading
    isLoading,
    isResending,
    isCodeComplete,

    handleChange,
    handleKeyDown,
    handlePaste,
    handleSubmit,
    handleResend,

    maskedEmail,
  };
};
