import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { deleteProduct, findProducts } from "../../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card, CardHeader } from "@mui/material";

const ProductTableView = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);

  React.useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: 1,
      pageSize: 100,
      stock: [],
    };
    dispatch(findProducts(data));
  }, []);

  return (
    <div className=" w-[32rem]">
      <Card className="mt-1">
        <CardHeader
          className="bg-[#242b2e] text-white"
          title="Recent Products"
        ></CardHeader>

        <TableContainer
          sx={{
            bgcolor: "#242b2e",
          }}
          
        >
          <Table
            sx={{
              color: "white",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Image</TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  Title
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Category
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Price
                </TableCell>
                <TableCell sx={{ color: "white" }} align="right">
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {product?.products?.content?.slice(0, 10).map((item) => (
                <TableRow
                  key={item.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right">
                    <Avatar src={item.image}></Avatar>
                  </TableCell>
                  <TableCell
                    sx={{ color: "white" }}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    {item.title}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    {item.category.name}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    {item.price}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="right">
                    {item.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductTableView;
