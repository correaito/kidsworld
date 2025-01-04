import { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

const initialCategories = [
  {
    id: 1,
    name: "Lançadores",
    image:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop",
    tag: "férias",
  },
  {
    id: 2,
    name: "Lego",
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format&fit=crop",
    tag: "",
  },
  {
    id: 3,
    name: "Hot Wheels",
    image:
      "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&auto=format&fit=crop",
    tag: "",
  },
  {
    id: 4,
    name: "Barbie",
    image:
      "https://plus.unsplash.com/premium_photo-1673757121102-0ca51260861f?w=500&auto=format&fit=crop",
    tag: "",
  },
  {
    id: 5,
    name: "Figuras",
    image:
      "https://images.unsplash.com/photo-1513384312027-9fa69a360337?w=500&auto=format&fit=crop",
    tag: "",
  },
  {
    id: 6,
    name: "Gift Card",
    image:
      "https://images.unsplash.com/photo-1561715276-a2d087060f1d?w=500&auto=format&fit=crop",
    tag: "",
  },
  {
    id: 7,
    name: "Especiais",
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500&auto=format&fit=crop",
    tag: "",
  },
  {
    id: 8,
    name: "Baby",
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=500&auto=format&fit=crop",
    tag: "",
  },
];

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialCategories);

  const addCategory = (category) => {
    setCategories([...categories, { ...category, id: categories.length + 1 }]);
  };

  const updateCategory = (id, updatedCategory) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const moveCategory = (id, direction) => {
    const index = categories.findIndex((category) => category.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === categories.length - 1)
    )
      return;

    const newCategories = [...categories];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newCategories[index], newCategories[newIndex]] = [
      newCategories[newIndex],
      newCategories[index],
    ];
    setCategories(newCategories);
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        moveCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
};
