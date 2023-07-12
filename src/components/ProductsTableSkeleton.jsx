import { Skeleton, Table, Tbody, Tr, Td } from "@chakra-ui/react";

function ProductsTableSkeleton() {
  return (
    <Table variant="simple">
      <Tbody>
        {[...Array(5)].map((_, rowIndex) => (
          <Tr key={rowIndex}>
            {[...Array(5)].map((_, colIndex) => (
              <Td key={colIndex}>
                <Skeleton height="20px" />
              </Td>
            ))}
            <Td display={'flex'} alignItems={"center"}>
              <Skeleton
                startColor={"blue.200"}
                endColor="blue.400"
                height={"30px"}
                w={'40px'}
                mr={2}
              />
           
              <Skeleton
                startColor={"red.200"}
                endColor="red.400"
                height={"30px"}
                w={'40px'}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ProductsTableSkeleton;
