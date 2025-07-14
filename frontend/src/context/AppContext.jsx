import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../service/categoryService";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const [auth, SetAuth] = useState({
    token: null,
    role: null
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
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
    setAuthData
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
