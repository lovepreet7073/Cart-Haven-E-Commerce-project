import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import DeliveyAddressForm from './DeliveyAddressForm';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    const querySearch = new URLSearchParams(location.search);
    const step = parseInt(querySearch.get("step")) || 0; // Ensure step is always a number

    // Update activeStep whenever the 'step' query parameter changes
    React.useEffect(() => {
        setActiveStep(step);
    }, [step]);

    // Function to navigate to a specific step
    const handleNextStep = (nextStep) => {
        navigate(`/checkout?step=${nextStep}`);
    };

    const handleNext = () => {
        handleNextStep(activeStep + 1);
    };

    const handleBack = () => {
        if (activeStep > 2) {
            handleNextStep(activeStep - 1);  // Navigate to the previous step
        }
    };

    return (
        <div className='px-10 lg:px-20 mt-10 mb-10'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const labelProps = {};

                        // Customize the active step color
                        if (index === activeStep) {
                            labelProps.StepIconProps = {
                                sx: { color: '#38a3a5' } // Set custom color for active step
                            };
                        }

                        return (
                            <Step key={label}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you're finished
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                        </Box>

                        {/* Render the correct component based on the step */}
                        <div>
                            {activeStep === 1 ? (
                                <DeliveyAddressForm
                                    onSubmit={() => handleNextStep(2)} // Go to Order Summary after submitting address
                                />
                            ) : activeStep === 2 ? (
                                <OrderSummary />
                            ) : (
                                <Typography></Typography>
                            )}
                        </div>
                    </React.Fragment>
                )}
            </Box>

            
        </div>
    );
}
