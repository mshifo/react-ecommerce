import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AlertModal } from "../shared/AlertDialog";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../app/services/api.slice";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosRemoveCircle } from "react-icons/io";
import CustomModal from "../shared/Modal";
import { set } from "react-hook-form";

const ProductsTable = ({ data }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [editEntity, setEditEntity] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMOpen,
    onOpen: onMOpen,
    onClose: onMClose,
  } = useDisclosure();

  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  useEffect(() => {
    if (isSuccess == true) {
      setDeleteId(null);
      onClose();
    }
  }, [isSuccess]);

  const adjustEditEntity = (field, numberName) => {
    if (isNaN(field)) {
      const { name, value } = field.target;
      setEditEntity({
        ...editEntity,
        [name]: value,
      });
    } else {
      setEditEntity({
        ...editEntity,
        [numberName]: +field,
      });
    }
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Number of items ({data?.length})</TableCaption>
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
                    colorScheme="cyan"
                    mr={2}
                    onClick={() => {
                      set;
                      setEditEntity(item.attributes);
                      onMOpen();
                    }}
                  >
                    <FiEdit />
                  </Button>
                  <Button
                    variant={"solid"}
                    size={"sm"}
                    colorScheme="red"
                    onClick={() => {
                      setDeleteId(item.id);
                      onOpen();
                    }}
                  >
                    <IoIosRemoveCircle />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AlertModal
        isLoading={isLoading}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        action={() => deleteProduct(deleteId)}
      />
      <CustomModal
        action={() => updateProduct()}
        isOpen={isMOpen}
        onClose={onMClose}
        onOpen={onMOpen}
      >
        <FormControl mb={2}>
          <FormLabel>First name</FormLabel>
          <Input
            name="title"
            onChange={adjustEditEntity}
            value={editEntity?.title}
            placeholder="First name"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Price</FormLabel>
          <NumberInput
            defaultValue={editEntity?.price}
            onChange={(e) => adjustEditEntity(e, "price")}
            name="price"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </CustomModal>
    </>
  );
};

export default ProductsTable;
