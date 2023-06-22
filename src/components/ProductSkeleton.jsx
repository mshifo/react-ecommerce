import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ProductSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="">
      <SkeletonCircle boxSize={"200px"} mx={"auto"} />
      <SkeletonText mx={"auto"} mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
      <SkeletonText m="10" noOfLines={1}  />
      <Skeleton w={"full"} rounded={'lg'} height={'50px'} mt={4} />
    </Box>
  );
};

export default ProductSkeleton;
