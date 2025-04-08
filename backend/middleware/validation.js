const validateSignup = (req, res, next) => {
  const { name, aadhaarNo, phone, email, pincode } = req.body;
  if (!name || !aadhaarNo || !phone || !email || !pincode) return res.status(400).json({ message: 'All fields are required' });
  next();
};
export { validateSignup };