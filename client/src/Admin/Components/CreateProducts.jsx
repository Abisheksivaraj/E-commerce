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
  Container,
  Divider,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { styled } from "@mui/material/styles";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
  { name: "XL", quantity: 0 },
  { name: "XXL", quantity: 0 },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CreateProducts = () => {
  const [productData, setProductData] = useState({
    images: {
      image: null,
      image2: null,
      image3: null,
      image4: null,
    },
    imagePreview: {
      image: null,
      image2: null,
      image3: null,
      image4: null,
    },
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
      discountedPrice: discountedPrice.toFixed(2),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];

      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, or WebP)");
        return;
      }

      if (file.size > maxSize) {
        alert("File size should be less than 5MB");
        return;
      }

      setProductData((prevData) => ({
        ...prevData,
        images: {
          ...prevData.images,
          [name]: file,
        },
        imagePreview: {
          ...prevData.imagePreview,
          [name]: URL.createObjectURL(file),
        },
      }));
    }
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size-quantity" ? "quantity" : "name"] = value;
    setProductData((prevData) => ({ ...prevData, size: sizes }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();

    // Append all product data
    Object.keys(productData).forEach((key) => {
      if (key !== "images" && key !== "imagePreview") {
        if (key === "size") {
          // Convert size array to JSON string
          formData.append(key, JSON.stringify(productData[key]));
        } else {
          formData.append(key, productData[key]);
        }
      }
    });

    // Append image files
    Object.keys(productData.images).forEach((key) => {
      if (productData.images[key]) {
        formData.append(key, productData.images[key]);
      }
    });

    try {
      // Dispatch action with FormData
      await dispatch(createProduct(formData));

      // Optional: Reset form or show success message
      alert("Product created successfully!");
    } catch (error) {
      console.error("Product creation failed:", error);
      alert("Failed to create product");
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: "#f4f6f9",
          minHeight: "100vh",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 4 }}
          >
            Create New Product
          </Typography>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={4}>
              {/* Image Upload Sections */}
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Product Images
                </Typography>
                <Grid container spacing={2}>
                  {["image", "image2", "image3", "image4"].map((imageName) => (
                    <Grid item xs={12} sm={3} key={imageName}>
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{
                          height: 200,
                          borderStyle: "dashed",
                          borderColor: productData.imagePreview[imageName]
                            ? "primary.main"
                            : "grey.400",
                        }}
                      >
                        {productData.imagePreview[imageName] ? (
                          <img
                            src={productData.imagePreview[imageName]}
                            alt={`Preview ${imageName}`}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          `Upload ${imageName.charAt(0).toUpperCase() + imageName.slice(1)}`
                        )}
                        <VisuallyHiddenInput
                          type="file"
                          name={imageName}
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              {/* Product Details */}
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Brand"
                  name="brand"
                  value={productData.brand}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={productData.title}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Color"
                  name="color"
                  value={productData.color}
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
                  label="Discounted Price"
                  name="discountedPrice"
                  type="number"
                  value={productData.discountedPrice}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              {/* Category Selects */}
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

              {/* Description */}
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

              {/* Size and Quantity */}
              <Grid item xs={12}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Size and Quantity
                </Typography>
                <Grid container spacing={2}>
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

              {/* Submit Button */}
              <Grid item xs={12} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<AddCircleOutlineIcon />}
                  type="submit"
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: 2,
                  }}
                >
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateProducts;
