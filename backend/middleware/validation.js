const validateSignup = (req, res, next) => {
  const { aadhaarNo, phone, pincode } = req.body;
  if (!aadhaarNo || !phone || !pincode) return res.status(400).json({ message: 'All fields are required' });
  next();
};
export { validateSignup };
