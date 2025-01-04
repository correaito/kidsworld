import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useRef } from "react";
import { useCategories } from "../context/CategoryContext";

const CategoryCarousel = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const { categories } = useCategories();

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 200;
      const newPosition =
        scrollPosition + (direction === "left" ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  return (
    <Box position="relative" my={4} mx="auto" maxW="1200px">
      {/* Botão de scroll esquerdo */}
      <Box
        position="absolute"
        left={2}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={() => scroll("left")}
        bg="white"
        borderRadius="full"
        w={8}
        h={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        boxShadow="lg"
        _hover={{ bg: "gray.100" }}
      >
        <FaChevronLeft />
      </Box>

      {/* Container do carrossel */}
      <Flex
        ref={containerRef}
        overflowX="hidden"
        gap={6}
        px={8}
        justifyContent="center"
        alignItems="center"
        minH="140px"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <Box
              textAlign="center"
              position="relative"
              transition="transform 0.2s"
              _hover={{ transform: "translateY(-5px)" }}
              minW="100px"
            >
              <Box
                position="relative"
                w="100px"
                h="100px"
                borderRadius="full"
                overflow="hidden"
                bg="white"
                boxShadow="0 4px 8px rgba(0,0,0,0.1)"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
                {category.tag && (
                  <Box
                    position="absolute"
                    bottom={0}
                    left="50%"
                    transform="translateX(-50%)"
                    bg="pink.400"
                    color="white"
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="lowercase"
                  >
                    {category.tag}
                  </Box>
                )}
              </Box>
              <Text mt={1} fontSize="sm" fontWeight="500" color="gray.700">
                {category.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Flex>

      {/* Botão de scroll direito */}
      <Box
        position="absolute"
        right={2}
        top="50%"
        transform="translateY(-50%)"
        zIndex={2}
        onClick={() => scroll("right")}
        bg="white"
        borderRadius="full"
        w={8}
        h={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        boxShadow="lg"
        _hover={{ bg: "gray.100" }}
      >
        <FaChevronRight />
      </Box>
    </Box>
  );
};

export default CategoryCarousel;
