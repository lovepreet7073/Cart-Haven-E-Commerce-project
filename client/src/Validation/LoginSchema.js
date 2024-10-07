import * as Yup from 'yup';

// Define the validation schema using Yup
export const LoginSchema = Yup.object({
    email: Yup.string()
        .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email address'
            ),
            password: Yup.string()
            .required('password is required')

   
});