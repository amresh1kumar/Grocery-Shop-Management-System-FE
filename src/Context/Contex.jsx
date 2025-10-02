import React, { Children, createContext } from "react";
import ProductList from '../assets/ProductList'

export const ShopContext = createContext();


const ShopContextProvider = (props) => {
   const cotextValue = { ProductList }
   return (
      <ShopContext.Provider value={cotextValue}>
         {props.children}
      </ShopContext.Provider>
   );
}

export default ShopContextProvider;
