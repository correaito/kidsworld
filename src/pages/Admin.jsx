import {
  Box,
  Container,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Image,
  VStack,
  useToast,
  Switch,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  EditIcon,
  DeleteIcon,
  AddIcon,
  StarIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useCarousel } from "../context/CarouselContext";
import { useCategories } from "../context/CategoryContext";

// Categorias disponíveis
const categories = [
  "Pelúcias",
  "Educativos",
  "Bonecas",
  "Veículos",
  "Arte",
  "Jogos",
];

// Produto inicial vazio para o formulário
const emptyProduct = {
  name: "",
  price: "",
  category: categories[0],
  image: "",
  featured: false,
};

// Slide inicial vazio para o formulário
const emptySlide = {
  title: "",
  subtitle: "",
  image: "",
};

const Admin = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleFeatured } =
    useProducts();
  const { slides, addSlide, updateSlide, deleteSlide, moveSlide } =
    useCarousel();
  const [currentProduct, setCurrentProduct] = useState(emptyProduct);
  const [currentSlide, setCurrentSlide] = useState(emptySlide);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSlide, setIsEditingSlide] = useState(false);
  const {
    isOpen: isProductModalOpen,
    onOpen: onProductModalOpen,
    onClose: onProductModalClose,
  } = useDisclosure();
  const {
    isOpen: isSlideModalOpen,
    onOpen: onSlideModalOpen,
    onClose: onSlideModalClose,
  } = useDisclosure();
  const toast = useToast();
  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    image: "",
    tag: "",
  });
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const {
    isOpen: isCategoryModalOpen,
    onOpen: onCategoryModalOpen,
    onClose: onCategoryModalClose,
  } = useDisclosure();
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    moveCategory,
  } = useCategories();

  // Funções para produtos
  const handleAddProduct = () => {
    setCurrentProduct(emptyProduct);
    setIsEditing(false);
    onProductModalOpen();
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    onProductModalOpen();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id);
    }
  };

  const handleSaveProduct = () => {
    if (
      !currentProduct.name ||
      !currentProduct.price ||
      !currentProduct.image
    ) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (isEditing) {
      updateProduct(currentProduct);
    } else {
      addProduct(currentProduct);
    }

    onProductModalClose();
  };

  // Funções para slides
  const handleAddSlide = () => {
    setCurrentSlide(emptySlide);
    setIsEditingSlide(false);
    onSlideModalOpen();
  };

  const handleEditSlide = (slide) => {
    setCurrentSlide(slide);
    setIsEditingSlide(true);
    onSlideModalOpen();
  };

  const handleDeleteSlide = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este slide?")) {
      deleteSlide(id);
    }
  };

  const handleSaveSlide = () => {
    if (!currentSlide.title || !currentSlide.subtitle || !currentSlide.image) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    if (isEditingSlide) {
      updateSlide(currentSlide);
    } else {
      addSlide(currentSlide);
    }

    onSlideModalClose();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8} color="brand.500">
        Área Administrativa
      </Heading>

      <Tabs colorScheme="brand" mb={8}>
        <TabList>
          <Tab>Produtos</Tab>
          <Tab>Carrossel</Tab>
          <Tab>Categorias</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box
              mb={8}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size="lg" color="brand.500">
                Gerenciar Produtos
              </Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="brand"
                onClick={handleAddProduct}
              >
                Novo Produto
              </Button>
            </Box>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Categoria</Th>
                  <Th isNumeric>Preço</Th>
                  <Th>Destaque</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product) => (
                  <Tr key={product.id}>
                    <Td>
                      <Image
                        src={product.image}
                        alt={product.name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Td>
                    <Td>{product.name}</Td>
                    <Td>{product.category}</Td>
                    <Td isNumeric>
                      R$ {product.price.toFixed(2).replace(".", ",")}
                    </Td>
                    <Td>
                      <Tooltip
                        label={
                          product.featured
                            ? "Remover dos destaques"
                            : "Adicionar aos destaques"
                        }
                        placement="top"
                      >
                        <IconButton
                          icon={<StarIcon />}
                          colorScheme={product.featured ? "yellow" : "gray"}
                          variant={product.featured ? "solid" : "ghost"}
                          onClick={() => toggleFeatured(product.id)}
                          aria-label={
                            product.featured
                              ? "Remover dos destaques"
                              : "Adicionar aos destaques"
                          }
                        />
                      </Tooltip>
                    </Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        mr={2}
                        onClick={() => handleEditProduct(product)}
                        aria-label="Editar"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDeleteProduct(product.id)}
                        aria-label="Excluir"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Box
              mb={8}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size="lg" color="brand.500">
                Gerenciar Carrossel
              </Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="brand"
                onClick={handleAddSlide}
              >
                Novo Slide
              </Button>
            </Box>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Posição</Th>
                  <Th>Imagem</Th>
                  <Th>Título</Th>
                  <Th>Subtítulo</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {slides.map((slide, index) => (
                  <Tr key={slide.id}>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<ChevronUpIcon />}
                          size="sm"
                          colorScheme="brand"
                          isDisabled={index === 0}
                          onClick={() => moveSlide(slide.id, "up")}
                          aria-label="Mover para cima"
                        />
                        <IconButton
                          icon={<ChevronDownIcon />}
                          size="sm"
                          colorScheme="brand"
                          isDisabled={index === slides.length - 1}
                          onClick={() => moveSlide(slide.id, "down")}
                          aria-label="Mover para baixo"
                        />
                        <Text>{index + 1}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Td>
                    <Td>{slide.title}</Td>
                    <Td>{slide.subtitle}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        mr={2}
                        onClick={() => handleEditSlide(slide)}
                        aria-label="Editar"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDeleteSlide(slide.id)}
                        aria-label="Excluir"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Box
              mb={8}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading size="lg" color="brand.500">
                Gerenciar Categorias
              </Heading>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="brand"
                onClick={() => {
                  setCurrentCategory({
                    name: "",
                    image: "",
                    tag: "",
                  });
                  setIsEditingCategory(false);
                  onCategoryModalOpen();
                }}
              >
                Nova Categoria
              </Button>
            </Box>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Ordem</Th>
                  <Th>Imagem</Th>
                  <Th>Nome</Th>
                  <Th>Tag</Th>
                  <Th>Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categories.map((category, index) => (
                  <Tr key={category.id}>
                    <Td>
                      <HStack spacing={2}>
                        <IconButton
                          icon={<ChevronUpIcon />}
                          size="sm"
                          colorScheme="brand"
                          isDisabled={index === 0}
                          onClick={() => moveCategory(category.id, "up")}
                          aria-label="Mover para cima"
                        />
                        <IconButton
                          icon={<ChevronDownIcon />}
                          size="sm"
                          colorScheme="brand"
                          isDisabled={index === categories.length - 1}
                          onClick={() => moveCategory(category.id, "down")}
                          aria-label="Mover para baixo"
                        />
                        <Text>{index + 1}</Text>
                      </HStack>
                    </Td>
                    <Td>
                      <Image
                        src={category.image}
                        alt={category.name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="full"
                      />
                    </Td>
                    <Td>{category.name}</Td>
                    <Td>{category.tag}</Td>
                    <Td>
                      <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        mr={2}
                        onClick={() => {
                          setCurrentCategory(category);
                          setIsEditingCategory(true);
                          onCategoryModalOpen();
                        }}
                        aria-label="Editar"
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Tem certeza que deseja excluir esta categoria?"
                            )
                          ) {
                            deleteCategory(category.id);
                          }
                        }}
                        aria-label="Excluir"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Modal de Categoria */}
            <Modal
              isOpen={isCategoryModalOpen}
              onClose={onCategoryModalClose}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {isEditingCategory ? "Editar Categoria" : "Nova Categoria"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>Nome</FormLabel>
                      <Input
                        value={currentCategory.name}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>URL da Imagem</FormLabel>
                      <Input
                        value={currentCategory.image}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            image: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Tag (opcional)</FormLabel>
                      <Input
                        value={currentCategory.tag}
                        onChange={(e) =>
                          setCurrentCategory({
                            ...currentCategory,
                            tag: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onCategoryModalClose}>
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="brand"
                    onClick={() => {
                      if (!currentCategory.name || !currentCategory.image) {
                        toast({
                          title: "Erro",
                          description:
                            "Por favor, preencha os campos obrigatórios",
                          status: "error",
                          duration: 2000,
                          isClosable: true,
                        });
                        return;
                      }

                      if (isEditingCategory) {
                        updateCategory(currentCategory.id, currentCategory);
                      } else {
                        addCategory(currentCategory);
                      }

                      onCategoryModalClose();
                    }}
                  >
                    {isEditingCategory ? "Atualizar" : "Criar"}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Modal de Produto */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={onProductModalClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Nome do Produto</FormLabel>
                <Input
                  value={currentProduct.name}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>URL da Imagem</FormLabel>
                <Input
                  value={currentProduct.image}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      image: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Categoria</FormLabel>
                <Select
                  value={currentProduct.category}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Preço</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </FormControl>

              {isEditing && (
                <FormControl display="flex" alignItems="center">
                  <FormLabel mb="0">Produto em Destaque</FormLabel>
                  <Switch
                    isChecked={currentProduct.featured}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        featured: e.target.checked,
                      })
                    }
                    colorScheme="brand"
                  />
                </FormControl>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onProductModalClose}>
              Cancelar
            </Button>
            <Button colorScheme="brand" onClick={handleSaveProduct}>
              {isEditing ? "Atualizar" : "Criar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de Slide */}
      <Modal isOpen={isSlideModalOpen} onClose={onSlideModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditingSlide ? "Editar Slide" : "Novo Slide"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Título</FormLabel>
                <Input
                  value={currentSlide.title}
                  onChange={(e) =>
                    setCurrentSlide({
                      ...currentSlide,
                      title: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Subtítulo</FormLabel>
                <Input
                  value={currentSlide.subtitle}
                  onChange={(e) =>
                    setCurrentSlide({
                      ...currentSlide,
                      subtitle: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>URL da Imagem</FormLabel>
                <Input
                  value={currentSlide.image}
                  onChange={(e) =>
                    setCurrentSlide({
                      ...currentSlide,
                      image: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onSlideModalClose}>
              Cancelar
            </Button>
            <Button colorScheme="brand" onClick={handleSaveSlide}>
              {isEditingSlide ? "Atualizar" : "Criar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Admin;
