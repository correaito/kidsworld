import { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

const ProductContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: "Urso de Pelúcia Encantado",
    image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11",
    price: 89.9,
    category: "Pelúcias",
    featured: true,
  },
  {
    id: 2,
    name: "Kit Blocos de Montar",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
    price: 129.9,
    category: "Educativos",
    featured: true,
  },
  {
    id: 3,
    name: "Boneca Interativa",
    image: "https://images.unsplash.com/photo-1602734846297-9299fc2d4703",
    price: 199.9,
    category: "Bonecas",
    featured: true,
  },
  {
    id: 4,
    name: "Carrinho de Controle Remoto",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65",
    price: 159.9,
    category: "Veículos",
    featured: false,
  },
  {
    id: 5,
    name: "Kit Arte e Pintura",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    price: 79.9,
    category: "Arte",
    featured: false,
  },
  {
    id: 6,
    name: "Quebra-Cabeça 500 Peças",
    image: "https://images.unsplash.com/photo-1516981442399-a91139e20ff8",
    price: 49.9,
    category: "Jogos",
    featured: false,
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const toast = useToast();

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Math.max(...products.map((p) => p.id), 0) + 1,
      featured: false,
    };
    setProducts([...products, newProduct]);
    toast({
      title: "Produto adicionado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const updateProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast({
      title: "Produto atualizado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast({
      title: "Produto excluído",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const toggleFeatured = (productId) => {
    const featuredCount = products.filter((p) => p.featured).length;
    const product = products.find((p) => p.id === productId);

    if (!product.featured && featuredCount >= 3) {
      toast({
        title: "Limite excedido",
        description: "Você só pode ter 3 produtos em destaque",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === productId ? { ...p, featured: !p.featured } : p
      )
    );

    toast({
      title: product.featured
        ? "Produto removido dos destaques"
        : "Produto adicionado aos destaques",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const getFeaturedProducts = () => {
    return products.filter((p) => p.featured);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeatured,
        getFeaturedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export default ProductContext;
