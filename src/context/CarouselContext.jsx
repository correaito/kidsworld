import { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";

const CarouselContext = createContext();

const initialSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
    title: "Brinquedos que Encantam",
    subtitle: "Descubra nossa coleção mágica",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
    title: "Diversão Garantida",
    subtitle: "Para todas as idades",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
    title: "Educação e Diversão",
    subtitle: "Brinquedos que estimulam o desenvolvimento",
  },
];

export const CarouselProvider = ({ children }) => {
  const [slides, setSlides] = useState(initialSlides);
  const toast = useToast();

  const addSlide = (slide) => {
    const newSlide = {
      ...slide,
      id: Math.max(...slides.map((s) => s.id), 0) + 1,
    };
    setSlides([...slides, newSlide]);
    toast({
      title: "Slide adicionado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const updateSlide = (updatedSlide) => {
    setSlides(slides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s)));
    toast({
      title: "Slide atualizado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteSlide = (slideId) => {
    if (slides.length <= 1) {
      toast({
        title: "Operação não permitida",
        description: "É necessário manter pelo menos um slide no carrossel",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setSlides(slides.filter((s) => s.id !== slideId));
    toast({
      title: "Slide excluído",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const moveSlide = (slideId, direction) => {
    const currentIndex = slides.findIndex((s) => s.id === slideId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;

    const newSlides = [...slides];
    const [movedSlide] = newSlides.splice(currentIndex, 1);
    newSlides.splice(newIndex, 0, movedSlide);
    setSlides(newSlides);

    toast({
      title: `Slide movido para ${direction === "up" ? "cima" : "baixo"}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <CarouselContext.Provider
      value={{
        slides,
        addSlide,
        updateSlide,
        deleteSlide,
        moveSlide,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a CarouselProvider");
  }
  return context;
};
