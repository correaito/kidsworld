import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Text,
  Button,
  Heading,
  Flex,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { useSearchParams } from "react-router-dom";

const categories = [
  "Todos",
  "Pelúcias",
  "Educativos",
  "Bonecas",
  "Veículos",
  "Arte",
  "Jogos",
];

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      bg="white"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={product.image}
        alt={product.name}
        h="200px"
        w="100%"
        objectFit="cover"
      />
      <Box p={4} flex="1" display="flex" flexDirection="column">
        <Tooltip label={product.name} placement="top" hasArrow>
          <Heading
            size="md"
            mb={2}
            noOfLines={1}
            _hover={{ cursor: "pointer" }}
          >
            {product.name}
          </Heading>
        </Tooltip>
        <Text color="gray.600" mb={2}>
          {product.category}
        </Text>
        <Flex justify="space-between" align="center" mt="auto">
          <Text color="brand.500" fontSize="xl" fontWeight="bold">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </Text>
          <Button
            colorScheme="brand"
            size="sm"
            onClick={() => onAddToCart(product)}
          >
            Adicionar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("name");
  const { addToCart } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [searchParams]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.price - b.price;
      } else if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      return a.name.localeCompare(b.name);
    });

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8} color="brand.500">
        Nossos Produtos
      </Heading>

      <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={8}>
        <InputGroup maxW={{ base: "100%", md: "300px" }}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Buscar produtos..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>

        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          maxW={{ base: "100%", md: "200px" }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          maxW={{ base: "100%", md: "200px" }}
        >
          <option value="name">Nome (A-Z)</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
        </Select>
      </Stack>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Products;
