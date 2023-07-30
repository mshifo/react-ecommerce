import {
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  CardFooter,
  Button,
  Card,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/features/cartSlice";

const ProductCard = ({ product }) => {
  const { id, attributes } = product;
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      addToCart({
        id,
        title: attributes.title,
        price: attributes.price,
        thumbnail: attributes.thumbnail,
      })
    );
  };
  return (
    <Card>
      <CardBody>
        <Image
          src={ attributes?.thumbnail?.data?.attributes?.formats?.thumbnail?.url}
          alt="Green double couch with wooden legs"
          borderRadius="full"
          boxSize={"200px"}
          mx={"auto"}
          objectFit={"cover"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" rounded={"lg"} textAlign={"center"} p={"3"}>
            {attributes.title}
          </Heading>
          <Text textAlign={"center"}>{attributes.description}</Text>
          <Text color={"purple.500"} textAlign={"center"} fontSize="2xl">
            EGP {attributes.price}
          </Text>
        </Stack>
      </CardBody>

      <CardFooter>
        <Button
          variant="solid"
          size={"lg"}
          width={"100%"}
          colorScheme="purple"
          color={"whiteAlpha.900"}
          onClick={addToCartHandler}
        >
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
