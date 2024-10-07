import React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

const AddressCard = ({ address, onSelect, isSelected, showRadio }) => {

    return (
        <Card variant="outlined" sx={{ marginBottom: 2, borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
                <Box display="flex" alignItems="center">
                    {showRadio && (
                        <input
                            type="radio"
                            checked={isSelected}
                            onChange={() => onSelect(address._id)} 
                        />
                    )}
                    <Typography variant="h6" component="div" fontWeight="bold" sx={{ ml: 0 }}>
                        {address?.firstName} {address?.lastName}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                    <strong>Address:</strong> {address?.streetAddress}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                {address?.city}, {address?.state} {address?.zipCode}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                    <strong>Phone:</strong> {address?.mobile}
                </Typography>
            </CardContent>
        </Card>
    );
};


export default AddressCard;
