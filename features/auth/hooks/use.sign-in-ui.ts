import { useState } from 'react';

const useSignInUi = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return {
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
  };
};

export default useSignInUi;
