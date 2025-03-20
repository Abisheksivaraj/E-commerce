import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../State/Product/Action";
import { Fragment } from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 },
  { name: "XXL", quantity: 0 },
];

const CreateProducts = () => {
  const [productData, setProductData] = useState({
    image: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
  });
  const dispatch = useDispatch();

  const calculateDiscountedPrice = (field, value) => {
    let price = productData.price;
    let discountPercent = productData.discountPercent;

    if (field === "price") {
      price = parseFloat(value) || 0;
    } else if (field === "discountPercent") {
      discountPercent = parseFloat(value) || 0;
    }

    
    const discountedPrice = price - (price * discountPercent) / 100;

    
    setProductData((prevData) => ({
      ...prevData,
      discountedPrice: discountedPrice.toFixed(2), // Format to 2 decimal places
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size-quantity" ? "quantity" : "name"] = value;
    setProductData((prevData) => ({ ...prevData, size: sizes }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    console.log(productData);
  };

  return (
    <div className="w-[65rem]">
      
        <Typography variant="h4" align="center" gutterBottom>
          Add New Product
        </Typography>

        <Box component={Paper} elevation={3} p={4} m={4} borderRadius={2} >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={productData.image}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  value={productData.color}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={productData.quantity}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={productData.price}
                  onChange={(e) => {
                    handleChange(e);
                    calculateDiscountedPrice(e.target.name, e.target.value);
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Discount Percentage"
                  name="discountPercent"
                  type="number"
                  value={productData.discountPercent}
                  onChange={(e) => {
                    handleChange(e);
                    calculateDiscountedPrice(e.target.name, e.target.value);
                  }}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Discount Price"
                  name="discountedPrice"
                  type="number"
                  value={productData.discountedPrice}
                  variant="outlined"
                  InputProps={{
                    readOnly: true, // Make the field read-only
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Top Level Category</InputLabel>
                  <Select
                    name="topLevelCategory"
                    value={productData.topLevelCategory}
                    onChange={handleChange}
                    label="Top Level Category"
                  >
                    <MenuItem value="men">Men</MenuItem>
                    <MenuItem value="women">Women</MenuItem>
                    <MenuItem value="kids">Kids</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Second Level Category</InputLabel>
                  <Select
                    name="secondLevelCategory"
                    value={productData.secondLevelCategory}
                    onChange={handleChange}
                    label="Second Level Category"
                  >
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="accessories">Accessories</MenuItem>
                    <MenuItem value="brands">Brands</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Third Level Category</InputLabel>
                  <Select
                    name="thirdLevelCategory"
                    value={productData.thirdLevelCategory}
                    onChange={handleChange}
                    label="Third Level Category"
                  >
                    <MenuItem value="mens_kurta">Mens Kurta</MenuItem>
                    <MenuItem value="top">Tops</MenuItem>
                    <MenuItem value="women_dress">Dresses</MenuItem>
                    <MenuItem value="t-shirts">T-Shirts</MenuItem>
                    <MenuItem value="saree">Saree</MenuItem>
                    <MenuItem value="lehenga-choli">Lehenga/Choli</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={productData.description}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Size and Quantity
                </Typography>
                <Grid container spacing={3}>
                  {productData.size.map((size, index) => (
                    <Fragment key={index}>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          fullWidth
                          label="Size Name"
                          name="name"
                          value={size.name}
                          onChange={(e) => handleSizeChange(e, index)}
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          fullWidth
                          label="Quantity"
                          name="size-quantity"
                          type="number"
                          value={size.quantity}
                          onChange={(e) => handleSizeChange(e, index)}
                          variant="outlined"
                        />
                      </Grid>
                    </Fragment>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  type="submit"
                >
                  Add New Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
     
    </div>
  );
};

export default CreateProducts;
