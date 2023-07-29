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
  const [entityId, setEntityId] = useState(null);
  const [editEntity, setEditEntity] = useState(null);
  const [thumbnail, setThumbnail] = useState(null)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isMOpen,
    onOpen: onMOpen,
    onClose: onMClose,
  } = useDisclosure();

  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating, isSuccess: isUpdated }] = useUpdateProductMutation();

  useEffect(() => {
    if (isSuccess == true) {
      setEntityId(null);
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

  const onFileSelect = (e) => {
    setThumbnail(e.target.files[0])
  }

  const onSubmitHandler = () => {
    const {title, price} = editEntity;

    const formData = new FormData();
    formData.append('data', JSON.stringify({title, price}))
    formData.append('files.thumbnail', thumbnail)

    updateProduct({id: entityId, body: formData});
    if(isUpdated){
      onMClose();
      setEditEntity(null);
      setEntityId(null);
      setThumbnail(null);
    }
  }

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
                      setEntityId(item.id);
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
                      setEntityId(item.id);
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
        action={() => deleteProduct(entityId)}
      />
      <CustomModal
        action={() => onSubmitHandler()}
        isOpen={isMOpen}
        onClose={onMClose}
        onOpen={onMOpen}
        isLoading = {isUpdating}
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

        <FormControl mb={2}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            name="thumbnail"
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            h={"full"}
            padding={2}
            onChange={onFileSelect}
          />
        </FormControl>

      </CustomModal>
    </>
  );
};

export default ProductsTable;
