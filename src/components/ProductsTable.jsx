import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const ProductsTable = ({ data }) => {
  console.log(data);
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>description</Th>
            <Th>price</Th>
            <Th>stock</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.attributes.title}</Td>
              <Td>{item.attributes.description.slice(0, 50)}...</Td>
              <Td>{item.attributes.price}</Td>
              <Td>{item.attributes.stock}</Td>
              <Td>
                <Button
                  variant={"solid"}
                  size={"sm"}
                  bg={"cyan.500"}
                  _hover={{
                    bg: "cyan.700"
                  }}
                  mr={2}
                >
                  Edit
                </Button>
                <Button
                  variant={"solid"}
                  size={"sm"}
                  bg={"red.500"}
                  _hover={{
                    bg: "red.700"
                  }}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
