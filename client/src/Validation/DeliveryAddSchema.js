import * as Yup from 'yup';

// Validation Schema using Yup
export const AddressSchema = Yup.object({
    firstName: Yup.string()
    .required('firstName is required')
        .min(2, 'First Name must be at least 2 characters'),
    lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name must be at least 2 characters'),
    streetAddress: Yup.string()
        .required('Street Address is required')
        .min(5, 'Street Address must be at least 5 characters'),
    city: Yup.string()
        .required('City is required'),
    state: Yup.string()
        .required('State is required'),
    zipCode: Yup.string()
        .required('Zip/Postal Code is required')
        .matches(/^[0-9]+$/, 'Zip/Postal Code must be numeric'),
    mobile: Yup.string()
        .required('Phone Number is required')
        .matches(/^[0-9]{10}$/, 'Phone Number must be exactly 10 digits')
});