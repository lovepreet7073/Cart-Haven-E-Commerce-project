import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { RegisterSchema } from '../../Validation/RegisterSchema';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../Redux/Auth/Actions';
const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const { auth } = useSelector(store => store)
    const emailError = auth?.error && auth?.error?.error && auth?.error?.error?.includes("User already exists")
    ? "User already exists"
    : null;
console.log(emailError,"emailError")

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }
    }, [jwt, auth.jwt])

  

    return (
        <div className=''>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={RegisterSchema}
        initialErrors={{ email: emailError }} 
        onSubmit={(values) => {
          dispatch(register(values));
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form >
            <div className=''>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  
                  fullWidth
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
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
                  error={touched.email && (Boolean(errors.email) || Boolean(emailError))}
                  helperText={touched.email && (errors.email || emailError)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  
                  variant="outlined"
                  fullWidth
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    px: "2rem",
                    bgcolor: "#38a3a5",
                    py: ".7rem",
                    mt: "1rem",
                    '&:hover': {
                      bgcolor: "#57b5b6",
                    },
                  }}
                  className="w-full"
                  size="large"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex justify-center items-center">
        <div className="flex py-1 items-center">
          <p>Already have an account? </p>
          <Button onClick={() => navigate('/login')} className="ml-5">Login</Button>
        </div>
      </div>
    </div>
    )
}

export default Register