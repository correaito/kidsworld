import {
  Box,
  Flex,
  Button,
  Heading,
  IconButton,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  FaShoppingCart,
  FaSearch,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaBars,
  FaGamepad,
  FaPuzzlePiece,
  FaBabyCarriage,
  FaFutbol,
  FaPlane,
  FaMicrochip,
  FaCreditCard,
  FaHatWizard,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { getCartItemsCount } = useCart();
  const cartItemCount = getCartItemsCount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  const menuItems = [
    { name: "Brinquedos", icon: FaGamepad },
    { name: "Jogos", icon: FaPuzzlePiece },
    { name: "Baby", icon: FaBabyCarriage },
    { name: "Esportes", icon: FaFutbol },
    { name: "Produtos Importados", icon: FaPlane },
    { name: "Tecnologia", icon: FaMicrochip },
    { name: "Cartão presente", icon: FaCreditCard },
    { name: "Fantasias", icon: FaHatWizard },
  ];

  return (
    <Box>
      {/* Barra superior */}
      <Box bg="#FFD700" py={2}>
        <Flex
          maxW="1200px"
          mx="auto"
          px={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex alignItems="center" gap={2}>
            <FaMapMarkerAlt />
            <Text fontSize="sm">Entregar em: 83203-410</Text>
          </Flex>
          <Flex alignItems="center" gap={4}>
            <Link to="#">
              <Text fontSize="sm">Olá, Entre ou Cadastre-se</Text>
            </Link>
            <Link to="#">
              <Flex alignItems="center" gap={1}>
                <FaWhatsapp size="20px" />
                <Text fontSize="sm">Atendimento</Text>
              </Flex>
            </Link>
          </Flex>
        </Flex>
      </Box>

      {/* Navbar principal */}
      <Box bg="#2ECC71" py={3} boxShadow="0 2px 10px rgba(0,0,0,0.1)">
        <Flex maxW="1200px" mx="auto" px={4} alignItems="center" gap={6}>
          <Link to="/">
            <Flex alignItems="center" gap={2}>
              <Box width="44px" height="44px">
                <img
                  src="/toy-store.svg"
                  alt="KidsWorld Logo"
                  style={{ width: "100%", height: "100%" }}
                />
              </Box>
              <Heading
                size="lg"
                color="white"
                fontFamily="'Nunito', sans-serif"
                sx={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                  letterSpacing: "1px",
                  transition: "transform 0.3s",
                  _hover: { transform: "scale(1.05)" },
                }}
              >
                KidsWorld
              </Heading>
            </Flex>
          </Link>

          <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: "500px" }}>
            <InputGroup bg="white" borderRadius="full">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input
                placeholder="Encontre aqui um mundo de diversão..."
                borderRadius="full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                _focus={{
                  boxShadow: "0 0 0 2px #FFD700",
                  borderColor: "#FFD700",
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  type="submit"
                  h="1.75rem"
                  size="sm"
                  borderRadius="full"
                  bg="#FFD700"
                  _hover={{ bg: "#FFE44D" }}
                >
                  <FaSearch />
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>

          <Flex alignItems="center" gap={4} ml="auto">
            <Link to="/products">
              <Button
                color="white"
                variant="ghost"
                fontWeight="bold"
                fontSize="md"
                sx={{
                  position: "relative",
                  transition: "all 0.2s",
                  borderRadius: "full",
                  px: 4,
                  bg: "rgba(255,255,255,0.1)",
                  _hover: {
                    transform: "translateY(-2px)",
                    bg: "rgba(255,255,255,0.2)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  _active: { transform: "translateY(0)" },
                }}
              >
                Produtos
              </Button>
            </Link>

            <Link to="/admin">
              <Button
                color="white"
                variant="ghost"
                fontWeight="bold"
                fontSize="md"
                sx={{
                  position: "relative",
                  transition: "all 0.2s",
                  borderRadius: "full",
                  px: 4,
                  bg: "rgba(255,255,255,0.1)",
                  _hover: {
                    transform: "translateY(-2px)",
                    bg: "rgba(255,255,255,0.2)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  _active: { transform: "translateY(0)" },
                }}
              >
                Admin
              </Button>
            </Link>

            <Link to="/cart">
              <IconButton
                aria-label="Carrinho de compras"
                variant="ghost"
                bg="rgba(255,255,255,0.1)"
                borderRadius="full"
                sx={{
                  position: "relative",
                  transition: "all 0.2s",
                  _hover: {
                    transform: "translateY(-2px)",
                    bg: "rgba(255,255,255,0.2)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                  _active: { transform: "translateY(0)" },
                }}
                icon={
                  <Box position="relative">
                    <FaShoppingCart
                      color="white"
                      size="20px"
                      style={{
                        filter: "drop-shadow(1px 1px 0 rgba(0,0,0,0.2))",
                      }}
                    />
                    {cartItemCount > 0 && (
                      <Badge
                        position="absolute"
                        top="-6px"
                        right="-6px"
                        bg="yellow.400"
                        color="red.500"
                        borderRadius="full"
                        boxShadow="0 2px 4px rgba(0,0,0,0.2)"
                        fontSize="0.7em"
                        p={1}
                        minW={5}
                        textAlign="center"
                      >
                        {cartItemCount}
                      </Badge>
                    )}
                  </Box>
                }
              />
            </Link>
          </Flex>
        </Flex>
      </Box>

      {/* Barra de navegação secundária */}
      <Box bg="white" borderBottom="1px" borderColor="gray.200">
        <Flex maxW="1200px" mx="auto" px={4} py={2} gap={6} alignItems="center">
          <Button
            leftIcon={<FaBars />}
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
            fontWeight="500"
            onClick={onOpen}
          >
            Todos os departamentos
          </Button>

          <Button
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
          >
            Presente por idade
          </Button>

          <Button
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
          >
            Novidades
          </Button>

          <Button
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
          >
            Férias
          </Button>

          <Button
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
          >
            Seja Embaixador
          </Button>

          <Button
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
          >
            Exclusivos
          </Button>

          <Button
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
          >
            Retira em loja
          </Button>

          <Button
            variant="ghost"
            color="gray.700"
            _hover={{ bg: "gray.100" }}
            fontSize="sm"
          >
            Evento em loja
          </Button>

          <Button variant="ghost" colorScheme="yellow" fontSize="sm">
            OUTLET!
          </Button>
        </Flex>
      </Box>

      {/* Drawer (Sidebar) */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" />
          <DrawerHeader borderBottomWidth="1px" fontSize="2xl" color="#2ECC71">
            Departamentos
          </DrawerHeader>
          <DrawerBody py={4}>
            <VStack spacing={2} align="stretch">
              {menuItems.map((item) => (
                <Button
                  key={item.name}
                  leftIcon={<item.icon size="20px" />}
                  variant="ghost"
                  justifyContent="flex-start"
                  py={6}
                  fontSize="lg"
                  color="gray.700"
                  _hover={{
                    bg: "green.50",
                    color: "#2ECC71",
                    transform: "translateX(8px)",
                  }}
                  transition="all 0.2s"
                  w="full"
                >
                  {item.name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
