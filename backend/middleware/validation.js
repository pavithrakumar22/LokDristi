export const validateSignup = (req, res, next) => {
  const { fullName, email, phoneNumber, password, confirmPassword, aadhaar, agreedToTerms } = req.body;

  if (!fullName || !email || !password || !confirmPassword || !agreedToTerms) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (aadhaar) {
    const aadhaarRegex = /^[2-9][0-9]{11}$/;
    if (!aadhaarRegex.test(aadhaar)) {
      return res.status(400).json({ message: 'Invalid Aadhaar number. Must be 12 digits, starting with 2-9.' });
    }
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};

// Optional: OTP login validation
// export const validateOtpLogin = (req, res, next) => {
//   const { phoneNumber } = req.body;

//   if (!phoneNumber) {
//     return res.status(400).json({ message: 'Phone number is required for OTP login' });
//   }

//   const phoneRegex = /^\+[0-9]{10,14}$/;
//   if (!phoneRegex.test(phoneNumber)) {
//     return res.status(400).json({ message: 'Invalid phone number format (e.g., +919876543210)' });
//   }

//   next();
// };