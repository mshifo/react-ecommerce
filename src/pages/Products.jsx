import axiosInstance from '../api/axios.config'
import ProductCard from "../components/ProductCard";
import { Grid } from "@chakra-ui/react";
import { useQuery } from "react-query";
import ProductSkeleton from "../components/ProductSkeleton";

const ProductsPage = () => {

  const getProductList = async () => {
    const { data } = await axiosInstance.get(`/products?populate=*`);

    return data;
  };

  const { isLoading, data } = useQuery("products", () =>
    getProductList()
  );

  return isLoading ? (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill,minmax(300px, 1fr))"
      gap={6}
    >
      {Array.from({ length: 20 }, (_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </Grid>
  ) : (
    <Grid
      margin={30}
      templateColumns="repeat(auto-fill,minmax(300px, 1fr))"
      gap={6}
    >
      {data.data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
};

export default ProductsPage;
