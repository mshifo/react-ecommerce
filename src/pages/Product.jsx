import { Box, Flex, Text } from "@chakra-ui/react";
import axiosInstance from '../api/axios.config'
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ProductSkeleton from "../components/ProductSkeleton";
import ProductCard from "../components/ProductCard";
import { BsArrowLeft } from "react-icons/bs";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  const getProduct = async () => {
    const { data } = await axiosInstance.get(`/products/${id}?populate=*`);
    return data;
  };

  const { isLoading, data } = useQuery(["products", id], getProduct);

  useEffect(() => {
    document.title = isLoading ? "" : data?.data?.attributes?.title;
  }, [data, isLoading]);

  return isLoading ? (
    <Box maxW={"sm"} mx={"auto"} my={20} p={4}>
      <ProductSkeleton />
    </Box>
  ) : (
    <>
      <Flex onClick={goBack} cursor={"pointer"} padding={4} mx={"auto"} maxW={"sm"} alignItems={"center"}>
        <BsArrowLeft />
        <Text fontSize={"lg"} ml={1}>Back</Text>
      </Flex>
      <Box maxW={"sm"} mx={"auto"} p={4}>
        <ProductCard product = {data.data} />
      </Box>
    </>
  );
};

export default ProductPage;
