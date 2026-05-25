import { useState } from 'react';

const useSignUpUi = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  return {
    showPassword,
    setShowPassword,
    agreeTerms,
    setAgreeTerms,
  };
};

export default useSignUpUi;
