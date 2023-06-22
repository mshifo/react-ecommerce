import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { IoIosRemoveCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../app/features/cartSlice";

const CartDrawerItem = ({ id, title, price, quantity, thumbnail }) => {
  const dispatch = useDispatch();
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <Box>
      <Flex>
        <Box w={"full"}>
          <Text>{title}</Text>
          <Text color={"teal.300"}>{price}</Text>
          <Text>Quantity: {quantity}</Text>
          <Button
            onClick={() => removeFromCartHandler(id)}
            colorScheme="red"
            size="xs"
            px={"5"}
            variant="outline"
            leftIcon={<IoIosRemoveCircle />}
          >
             Remove
          </Button>
        </Box>
        <Image
          w={20}
          maxH={"100%"}
          src={`${import.meta.env.VITE_APP_API_URL}${
            thumbnail?.data?.attributes?.url
          }`}
          alt={title}
        />
      </Flex>
    </Box>
  );
};

export default CartDrawerItem;
