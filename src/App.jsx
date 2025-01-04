import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { CategoryProvider } from "./context/CategoryContext";

const theme = extendTheme({
  fonts: {
    heading: "'Nunito', sans-serif",
    body: "'Nunito', sans-serif",
  },
  colors: {
    brand: {
      50: "#fff9e6",
      100: "#ffe4b3",
      200: "#ffcf80",
      300: "#ffba4d",
      400: "#ffa51a",
      500: "#ff9000",
      600: "#cc7300",
      700: "#995600",
      800: "#663a00",
      900: "#331d00",
    },
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <CategoryProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </CategoryProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;
