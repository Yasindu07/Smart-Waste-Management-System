import React, { useState,  } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
//import axios from 'axios'; // For API requests

const OrderProcess = () => {
    const [totalAmount] = useState(100); // Example total amount
    //const [address, setAddress] = useState(''); // User's address (fetched from API)
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
    });


    // Function to handle card detail changes
    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Function to handle form submission (e.g., process payment)
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log("Card Details Submitted:", cardDetails);
        // Add your submission logic here (e.g., API call to process the payment)
    };

    return (
        <Box sx={{ padding: { xs: 2, md: 5 }, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
                Order Process
            </Typography>

            {/* Total Amount */}
            <Typography variant="h6" gutterBottom>
                Total Amount: ${totalAmount}
            </Typography>

            {/* User Address */}
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="body1">
                    {/* Address:  */}
                </Typography>
            </Box>

            {/* Card Details Form */}
            <Typography variant="h6" gutterBottom>
                Card Details
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label="Card Number"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Card Holder Name"
                    name="cardHolder"
                    value={cardDetails.cardHolder}
                    onChange={handleCardChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Expiry Date (MM/YY)"
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="CVV"
                    name="cvv"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={handleCardChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 3 }}>
                    Complete Order
                </Button>
            </Box>
        </Box>
    );
};

export default OrderProcess;
