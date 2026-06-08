import { useEffect, useRef, useState } from 'react';
import { useResendEmailCode } from '../hooks/use.resend-email-code';
import { useVerifyEmailAction } from './use.verify-email.action';
import { getObjectFromSessionStorage } from '@/shared/lib/session-storage.helper';
import { useToast } from '@/shared/hooks';

export const useVerifyEmail = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(45);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { resend } = useResendEmailCode();
  const {
    verify,
    isLoading: isVerifying,
    isError,
    isSuccess,
  } = useVerifyEmailAction();

  const { toast } = useToast();

  useEffect(() => {
    const storedEmail = getObjectFromSessionStorage('verifyEmail');
    if (storedEmail) setEmail(storedEmail);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleVerify = async () => {
    if (code.length !== 6) return;
    if (!email) return;
    try {
      await verify(code, email);
    } catch (err: any) {
      console.log(err);
      toast({ title: err.data.error, description: err.data.message });
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(45);
    if (!email) return;
    await resend(email);
  };

  return {
    code,
    setCode,
    email,
    secondsLeft,
    isVerifying,
    isError,
    isSuccess,
    handleVerify,
    handleResend,
  };
};
