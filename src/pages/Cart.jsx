import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Image,
  Text,
  Button,
  IconButton,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="center">
          <Heading color="brand.500">Seu Carrinho está Vazio</Heading>
          <Text>Que tal adicionar alguns produtos incríveis?</Text>
          <Button as={Link} to="/products" colorScheme="brand" size="lg">
            Ver Produtos
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8} color="brand.500">
        Seu Carrinho
      </Heading>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        shadow="md"
      >
        <VStack spacing={0} align="stretch">
          {cartItems.map((item, index) => (
            <Box key={item.id}>
              {index > 0 && <Divider />}
              <HStack spacing={4} p={4}>
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                />
                <VStack flex="1" align="start" spacing={1}>
                  <Heading size="md">{item.name}</Heading>
                  <Text color="brand.500" fontWeight="bold">
                    R$ {item.price.toFixed(2).replace(".", ",")}
                  </Text>
                </VStack>
                <NumberInput
                  maxW="100px"
                  min={1}
                  max={10}
                  value={item.quantity}
                  onChange={(value) => updateQuantity(item.id, value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text fontWeight="bold" minW="100px" textAlign="right">
                  R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </Text>
                <IconButton
                  aria-label="Remover item"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => removeFromCart(item.id)}
                />
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>

      <Box
        mt={8}
        p={6}
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        shadow="md"
      >
        <HStack justify="space-between" mb={4}>
          <Button
            colorScheme="red"
            variant="ghost"
            leftIcon={<DeleteIcon />}
            onClick={clearCart}
          >
            Limpar Carrinho
          </Button>
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Total do Pedido:
            </Text>
            <Text fontSize="2xl" fontWeight="bold" color="brand.500">
              R$ {getCartTotal().toFixed(2).replace(".", ",")}
            </Text>
          </Box>
        </HStack>
        <Button colorScheme="brand" size="lg" width="100%">
          Finalizar Compra
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;
