import * as Yup from 'yup';

// Validation Schema
export  const RegisterSchema = Yup.object({
    firstName: Yup.string()
    .required('firstName is required')
    .min(2, 'Too Short!').max(50, 'Too Long!'),
    lastName: Yup.string()
    .required('lastName is required')
    .min(2, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string()
    .required('email is required')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email address'
      ),
    password: Yup.string()
    .required('password is required')
      .min(8, 'Password should be at least 8 characters')
      .matches(/[A-Z]/, 'Password should contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password should contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password should contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password should contain at least one special character'
      ),
  });
  