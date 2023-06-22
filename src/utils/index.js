import { createStandaloneToast } from "@chakra-ui/react";

export const addToShoppingCart = (cartItem, shoppingCart = []) => {
    const exists = shoppingCart.find(item => item.id === cartItem.id);
    const { toast } = createStandaloneToast();
    toast({
        title: "Item added",
        description: "",
        status: 'success',
        duration: 3000,
        isClosable: true,
    })
    if (exists) {
        return shoppingCart.map(item =>
            item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
        )
    }
    return [...shoppingCart, { ...cartItem, quantity: 1 }];
}