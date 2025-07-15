import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/categoryService";
import { fetchItems } from "../service/itemService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [itemsData, setItemsData] = useState([]);

  const [auth, SetAuth] = useState({
    token: null,
    role: null
  })

  useEffect(() => {
    const loadData = async () => {
      try {

        if( localStorage.getItem("token") && localStorage.getItem("role") ) {
          SetAuth({
            token: localStorage.getItem("token"),
            role: localStorage.getItem("role")
          });
        }

        const response = await fetchCategories();
        setCategories(response.data);
        const itemResponse = await fetchItems();
        setItemsData(itemResponse.data);


      } catch (err) {
        console.error("Unauthorized or error fetching categories", err);
      }
    };
  
    if (auth.token || localStorage.getItem("token")) {
      loadData();
    }
  }, [auth.token]);
  

  const setAuthData = (token, role) => {
    SetAuth({
      token,
      role
    });
  }

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    itemsData,
    setItemsData
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
