// Password requirements
export const passwordRequirementsHelper = (
  password: string,
  confirmPassword: string,
) => {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) },
    {
      label: 'One special character (!@#$%^&*)',
      met: /[!@#$%^&*]/.test(password),
    },
  ];

  const allRequirementsMet = requirements.every((req) => req.met);
  const passwordsMatch = password === confirmPassword && confirmPassword !== '';
  return {
    requirements,
    allRequirementsMet,
    passwordsMatch,
  };
};
