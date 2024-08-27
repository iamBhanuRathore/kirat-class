import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api";
import ProductList from "./ProductList";
import { Typography, Container, Pagination } from "@mui/material";
import { queryClient } from "./provider/query-provider";
import DebouncedTextField from "./debounced-textarea";
import BasicPopover from "./user-button";

const ITEMS_PER_PAGE = 12;
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
}

const ProductDashboard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["products", page, searchTerm],
    queryFn: () => {
      // Check if data for this page is already in cache
      const cachedData = queryClient.getQueryData<Product[]>([
        "products",
        page,
        searchTerm,
      ]);
      if (cachedData) {
        return cachedData;
      }
      // If not, fetch new data
      return fetchProducts(page, ITEMS_PER_PAGE, searchTerm);
    },
  });
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  // Reset page to 1 whenever searchTerm changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);
  if (error)
    return (
      <Typography color="error">Error: {(error as Error).message}</Typography>
    );
  return (
    <Container>
      <nav className="shadow-md border-b-[1px] text-center border-gray-700 mb-5 py-3 md:flex justify-between items-center px-5">
        <DebouncedTextField
          label="Search products"
          onChangeDebounced={(value) => {
            setSearchTerm(value);
          }}
          placeholder="Search By Name here..."
          debounceDelay={500}
          className="w-full md:w-[500px] my-2"
        />
        <BasicPopover />
      </nav>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <ProductList products={data || []} />
          <Pagination
            count={10}
            page={page}
            onChange={handlePageChange}
            color="primary"
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      )}
    </Container>
  );
};

export default ProductDashboard;
