import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import { CarouselProvider } from "./context/CarouselContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductProvider>
      <CartProvider>
        <CarouselProvider>
          <App />
        </CarouselProvider>
      </CartProvider>
    </ProductProvider>
  </React.StrictMode>
);
