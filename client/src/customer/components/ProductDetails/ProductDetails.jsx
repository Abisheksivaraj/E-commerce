import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { Button, LinearProgress, Rating } from "@mui/material";
import Grid from "@mui/material/Grid";
import ProductReview from "../ProductDetails/ProductReview";
import Box from "@mui/material/Box";
import HomeSectionCard from "../../Pages/Homepage/HomeSectionCard";
import { Mens_Kurta } from "../../../Data/HomePage_Datas/Mens_Kurta";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../State/Product/Action";
import { store } from "../../../State/Store";
import { addItemToCart } from "../../../State/Cart/Action";

const Products = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  image: [
    {
      src: "https://veirdo.in/cdn/shop/files/54_1.jpg?v=1723446311",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://img-c.udemycdn.com/course/750x422/5444528_d4e3_5.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://veirdo.in/cdn/shop/files/ai_creative_0000_Layer_6.jpg?v=1736570574",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://veirdo.in/cdn/shop/files/b_0119493a-9927-4550-8323-baefe5f625c0.jpg?v=1724147309",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  size: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function productDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

  // console.log("======", params.productId);

  const handleAddToCart = () => {
      const data = { productId:params.productId, size: selectedSize.name };
    console.log("selected size", data);

    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  // console.log("paramsData", params);

  useEffect(() => {
    const data = { productId:params.productId };
    dispatch(findProductsById(data));
  }, [params.productId]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {Products.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}

        <section>
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            {/* First Image */}
            <img
              src={product.product?.image}
              alt={Products.image[0]?.src}
              className="hidden aspect-[3/4] size-full rounded-lg object-cover lg:block"
            />

            {/* Second and Third Images */}
            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <img
                alt={Products.image[1]?.alt}
                src={product.product?.image2}
                className="aspect-[3/2] size-full rounded-lg object-cover"
              />
              <img
                alt={Products.image[2]?.alt}
                src={product.product?.image3}
                className="aspect-[3/2] size-full rounded-lg object-cover"
              />
            </div>

            {/* Fourth Image */}
            <img
              alt={Products.image[3]?.alt}
              src={product.product?.image4}
              className="aspect-[4/5] size-full object-cover sm:rounded-lg lg:aspect-[3/4]"
            />
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.product?.brand}
              </h1>
              <h1>{product.product?.title}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0 ">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-gray-900">
                  ₹{product.product?.discountedPrice}
                </p>

                <p className="line-through opacity-50">
                  ₹{product.product?.price}
                </p>
                <p className="text-[green] font-medium">
                  {product.product?.discountPercent}% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <Rating
                  name="half-rating-read"
                  defaultValue={3.5}
                  precision={0.5}
                  readOnly
                />

                <p className="opacity-50 text-sm">34567 Ratings</p>
                <p className="opacity-50 text-sm text-indigo-600 font-medium ml-3">
                  3456 Views
                </p>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      // value={selectedColor}
                      // onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {Products.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "size-8 rounded-full border border-black/10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {Products.size.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{
                    mt: 10,
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    border: "1px solid transparent",
                    backgroundColor: "indigo.600",
                    px: 8,
                    py: 3,
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "indigo.700",
                    },
                    "&:focus": {
                      outline: "none",
                      ring: 2,
                      ringColor: "indigo.500",
                      ringOffset: 2,
                    },
                  }}
                >
                  Add To Bag
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {Products.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings and Reviews */}
        <section>
          <h1 className="font-medium">Recent Review & Ratings</h1>

          <div className="border p-5 mt-2">
            <Grid container spacing={7}>
              <Grid item xs={7}>
                <div className="space-y-5">
                  {[1, 1, 1].map((item, index) => (
                    <ProductReview key={index} />
                  ))}
                </div>
              </Grid>

              <Grid item xs={5} className="">
                <h1 className="font-medium">Product Ratings</h1>

                <div className="flex items-center pt-3">
                  <Rating value={3.7} precision={0.5} readOnly></Rating>
                  <p className="opacity-40 font-normal">76543 Ratings</p>
                </div>

                <Box className="mt-5 space-y-2">
                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p className="opacity-70">Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 5 }}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p className="opacity-70 w-[10rem]">Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 5 }}
                        variant="determinate"
                        value={30}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p className="opacity-70">Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 5,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "yellow",
                          },
                        }}
                        variant="determinate"
                        value={25}
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p className="opacity-70">Average</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 5,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "orange",
                          },
                        }}
                        variant="determinate"
                        value={20}
                        color="success"
                      />
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" gap={2}>
                    <Grid item xs={2}>
                      <p className="opacity-70">Poor</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 5,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "red",
                          },
                        }}
                        variant="determinate"
                        value={40}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}

        <section className="pt-10">
          <h1 className="font-medium">Similar Products</h1>

          <div className="flex flex-wrap space-y-5 pt-5">
            {Mens_Kurta.map((item, index) => (
              <HomeSectionCard key={index} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
