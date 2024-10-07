import React, { useState, Fragment } from 'react';
import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../Redux/Product/Action';
import { toast } from 'react-hot-toast';
import { navigation } from '../../customer/components/Navigation/Navigation';
const initialSizes = [
    {
        name: "S",
        quantity: 0
    },
    {
        name: "M",
        quantity: 0
    },
    {
        name: "L",
        quantity: 0
    }
];

const initialProductData = {
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    sizes: initialSizes,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: ""
};

const CreateProductForm = () => {
    const [productData, setProductData] = useState(initialProductData);
    const [filteredSecondLevel, setFilteredSecondLevel] = useState([]);
    const [filteredThirdLevel, setFilteredThirdLevel] = useState([]);
    const dispatch = useDispatch();
    const token = localStorage.getItem("jwt");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === 'topLavelCategory') {
            const selectedCategory = navigation.categories.find(cat => cat.id === value);
            setFilteredSecondLevel(selectedCategory ? selectedCategory.sections : []);
            setProductData(prev => ({
                ...prev,
                secondLavelCategory: '',
                thirdLavelCategory: '',
            }));
        }

        if (name === 'secondLavelCategory') {
            const selectedSection = filteredSecondLevel.find(sec => sec.id === value);
            setFilteredThirdLevel(selectedSection ? selectedSection.items : []);
            setProductData(prev => ({
                ...prev,
                thirdLavelCategory: '',
            }));
        }
    };
    const handleSizeChange = (e, index) => {
        const { name, value } = e.target;
        const keyName = name === "size_quantity" ? "quantity" : name;

        const updatedSizes = [...productData.sizes];
        updatedSizes[index][keyName] = value;

        setProductData((prev) => ({
            ...prev,
            sizes: updatedSizes
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct({ data: productData, token }))
            .then(() => {
                // Show success toast
                toast.success("Product added successfully!");
                // Reset product data to initial state
                setProductData(initialProductData);
            })

    }

    return (
        <Fragment>
            <Box
                sx={{
                    padding: '20px',
                    border: '1px solid #ccc',
                }}
            >
                <Typography variant='h4' sx={{ textAlign: "center" }} className='py-10 text-center'>
                    Add New Product
                </Typography>
                <form onSubmit={handleSubmit} className='min-h-screen'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Image URL" name='imageUrl' value={productData.imageUrl} onChange={handleChange} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Brand" name='brand' value={productData.brand} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Title" name='title' value={productData.title} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Color" name='color' value={productData.color} onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Quantity" name='quantity' value={productData.quantity} type='number' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="Price" name='price' value={productData.price} type='number' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="Discounted Price" name='discountedPrice' value={productData.discountedPrice} type='number' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField fullWidth label="Discount Percentage" name='discountPercent' value={productData.discountPercent} type='number' onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Top Level Category</InputLabel>
                                <Select
                                    name='topLavelCategory'
                                    value={productData.topLavelCategory}
                                    onChange={handleChange}
                                    label="Top Level Category"
                                >
                                    {navigation?.categories?.map(category => (
                                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Second Level Category</InputLabel>
                                <Select
                                    name='secondLavelCategory'
                                    value={productData.secondLavelCategory}
                                    onChange={handleChange}
                                    label="Second Level Category"
                                    disabled={!productData.topLavelCategory}
                                >
                                    {filteredSecondLevel.map(section => (
                                        <MenuItem key={section.id} value={section.id}>{section.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Third Level Category</InputLabel>
                                <Select
                                    name='thirdLavelCategory'
                                    value={productData.thirdLavelCategory}
                                    onChange={handleChange}
                                    label="Third Level Category"
                                    disabled={!productData.secondLavelCategory}
                                >
                                    {filteredThirdLevel.map(item => (
                                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField fullWidth label="Description" name='description' value={productData.description} multiline rows={3} onChange={handleChange} />
                        </Grid>

                        {productData.sizes.map((size, index) => (
                            <Grid container item spacing={3} key={index}>
                                <Grid item xs={12} sm={6}>
                                    <TextField label='Size Name' value={size.name} name='name' onChange={(e) => handleSizeChange(e, index)} required fullWidth />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField label='Quantity' value={size.quantity} name='size_quantity' onChange={(e) => handleSizeChange(e, index)} required fullWidth type='number' />
                                </Grid>
                            </Grid>
                        ))}

                        <Grid item xs={12}>
                            <Button
                                variant='contained'
                                sx={{ p: 1.8 }}
                                className='py-20'
                                size='large'
                                type='submit'
                            >Add New Product</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Fragment>
    )
}

export default CreateProductForm;
