import "./App.css";
import { useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import { category } from "./jsonData/category";
import { productList } from "./jsonData/productList";
import ProductDetails from "./pages/ProductDetails";
import "./styles/bootstrap.min.css";
import "./styles/common.css";

function App() {
  const [product, setProduct] = useState({
    products: productList.productList,
    category: category.categories,
  });
  
  return (
    <Context.Provider value={{state: product}}>
      <Router>
        <Routes>
         
          <Route
            exact
            path="/product/:productid/details"
            element={
              <Suspense fallback={<div className="loader"></div>}>
                <ProductDetails />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
