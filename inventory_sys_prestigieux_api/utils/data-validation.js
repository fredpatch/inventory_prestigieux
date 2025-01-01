// validation.js
export const email_validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const password_validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const validateFullname = (fullname, res, next) => {
  if (fullname.length <= 3) {
    return res
      .status(400)
      .json({ message: "Fullname must be at least 3 characters long" });
  }
  return null;
};

const validateEmail = (email, res, next) => {
  if (email.length === 0) {
    return res.status(400).json({ message: "Email is required" });
  }
  if (!email_validation.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }
};

const validatePassword = (password, res, next) => {
  if (!password_validation.test(password)) {
    return res.status(400).json({
      message:
        "Password should be between 6 to 20 characters and should contain at least 1 uppercase letter, 1 lowercase letter and 1 digit",
    });
  }
  return null;
};

export { validateFullname, validateEmail, validatePassword };
