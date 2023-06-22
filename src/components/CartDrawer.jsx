import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  StackDivider,
  Text,
  Box,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCloseDrawer, selectGlobal } from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { clearCart, selectCart } from "../app/features/cartSlice";

function CartDrawer() {
  const btnRef = useRef();

  const { isDrawerOpen } = useSelector(selectGlobal);
  const { cartProducts } = useSelector(selectCart);
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    dispatch(openCloseDrawer());
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
    onCloseHandler();
  };

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={onCloseHandler}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>Shopping Cart</DrawerHeader>
        {cartProducts.length ? (
          <>
            <DrawerBody>
              <VStack
                divider={<StackDivider borderColor="gray.100" />}
                spacing={4}
                align="stretch"
              >
                {cartProducts.map((product) => (
                  <CartDrawerItem key={product.id} {...product} />
                ))}
              </VStack>
            </DrawerBody>
            <DrawerFooter>
              <Button
                variant="outline"
                colorScheme="red"
                mr={3}
                onClick={clearCartHandler}
              >
                Clear All
              </Button>
              <Button colorScheme="green">Checkout</Button>
            </DrawerFooter>
          </>
        ) : (
          <Text p={5}>Shopping Cart is Empty</Text>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default CartDrawer;
