import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { login } from '../../Redux/Auth/Actions';
import { LoginSchema } from '../../Validation/LoginSchema';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access Redux state for potential backend errors
    const auth = useSelector(state => state.auth);

    const [initialErrors, setInitialErrors] = useState({ email: '', password: '' });
    useEffect(() => {
        if (auth?.error) {
            console.log(auth?.error);  // Check the structure
            const emailError = auth?.error?.error?.includes("User not found with this email")
                ? "User not found with this email"
                : '';
            const passwordError = auth?.error?.error?.includes("Invalid Password")
                ? "Invalid Password"
                : '';
            setInitialErrors({ email: emailError, password: passwordError });
        }
    }, [auth?.error]);

    console.log(initialErrors, "initialErrors")
    // Handle form submission
    const handleSubmit = (values) => {
        const userData = {
            email: values.email,
            password: values.password,
        };
        dispatch(login(userData, navigate));
    };

    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                initialErrors={initialErrors}// Yup validation schema
                onSubmit={handleSubmit}
            // Set initial errors from backend
            >
                {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form>
                        <Grid container spacing={4}>
                            {/* Email Field */}
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.email && (Boolean(errors.email) || Boolean(initialErrors.email))}
                                    helperText={touched.email && (errors.email || initialErrors.email)}
                                    autoComplete="given-name"
                                />

                            </Grid>

                            {/* Password Field */}
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password && (Boolean(errors.password) || Boolean(initialErrors.password))}
                                    helperText={touched.password && (errors.password || initialErrors.password)}
                                    autoComplete="given-name"
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12} sm={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        px: '2rem',
                                        bgcolor: '#38a3a5',
                                        py: '.7rem',
                                        mt: '1rem',
                                        '&:hover': {
                                            bgcolor: '#57b5b6',
                                        },
                                    }}
                                    className="w-full"
                                    size="large"
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>

            {/* Registration Link */}
            <div className="flex justify-center ">
                <div className="flex py-1 items-center">
                    <p>New User? </p>
                    <Button
                        type="button"
                        onClick={() => navigate('/register')}
                        className="ml-5"
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;
