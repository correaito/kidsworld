import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCarousel } from "../context/CarouselContext";
import CategoryCarousel from "../components/CategoryCarousel";

const Home = () => {
  const bgOverlay = useColorModeValue("rgba(0,0,0,0.4)", "rgba(0,0,0,0.6)");
  const { getFeaturedProducts } = useProducts();
  const { slides } = useCarousel();
  const featuredProducts = getFeaturedProducts();

  return (
    <Box>
      <CategoryCarousel />

      <Box position="relative" h="600px" mb={8}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          style={{ width: "100%", height: "100%" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                w="100%"
                h="100%"
                position="relative"
                bgImage={`url(${slide.image})`}
                bgSize="cover"
                bgPosition="center"
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg={bgOverlay}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  color="white"
                  textAlign="center"
                  px={4}
                >
                  <Heading
                    size="2xl"
                    mb={4}
                    textShadow="2px 2px 4px rgba(0,0,0,0.4)"
                  >
                    {slide.title}
                  </Heading>
                  <Text
                    fontSize="xl"
                    mb={6}
                    textShadow="1px 1px 2px rgba(0,0,0,0.4)"
                  >
                    {slide.subtitle}
                  </Text>
                  <Button
                    as={Link}
                    to="/products"
                    size="lg"
                    colorScheme="brand"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg",
                    }}
                  >
                    Explorar Produtos
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Container maxW="container.xl" py={8}>
        <Heading
          mb={8}
          textAlign="center"
          color="brand.500"
          fontSize={{ base: "2xl", md: "3xl" }}
        >
          Produtos em Destaque
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={8}
          px={{ base: 4, md: 0 }}
        >
          {featuredProducts.map((product) => (
            <Box
              key={product.id}
              borderRadius="lg"
              overflow="hidden"
              shadow="md"
              bg="white"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                shadow: "lg",
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                h="300px"
                w="100%"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading size="md" mb={2}>
                  {product.name}
                </Heading>
                <Text color="brand.500" fontSize="xl" fontWeight="bold">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </Text>
                <Button
                  as={Link}
                  to="/products"
                  mt={4}
                  w="100%"
                  colorScheme="brand"
                  _hover={{
                    transform: "translateY(-2px)",
                  }}
                >
                  Ver Detalhes
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
