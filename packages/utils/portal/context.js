import React, {
  createContext,
  useContext,
  useState,
} from 'react';

export const makeContext = (defaultValue = null) => {
  const Context = createContext(defaultValue);
  const Provider = ({ children }) => {
    const [ref, setRef] = useState(defaultValue);
    return (
      <Context.Provider value={({ ref, setRef })}>
        {children}
      </Context.Provider>
    );
  };
  const usePortal = () => useContext(Context);
  return {
    Provider,
    Context,
    usePortal,
  };
};

export default makeContext;
