import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/categoryService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchCategories();
      setCategories(response.data);
    };
    loadData();
  }, []);

  const contextValue = {
    categories,
    setCategories,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
