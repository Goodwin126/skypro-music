import React, { useState } from "react";
import { render, cleanup } from "@testing-library/react";
import { configureStore, setupListeners } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ThemeContext, themes } from "./contexts/theme";

const AllProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const toggleTheme = () => {
    if (currentTheme === themes.dark) {
      setCurrentTheme(themes.light);
      return;
    }
    setCurrentTheme(themes.dark);
  };
  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Обертка, предоставляющая store дочерним компонентам
export function withStoreProvider(store) {
  return function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  };
}

//функция для мока Api

export const setupApiStore = (api, extraReducers, withoutListeners) => {
  const getStore = () =>
    configureStore({
      reducer: { [api.reducerPath]: api.reducer, ...extraReducers },
      middleware: (gdm) =>
        gdm({
          serializableCheck: false,
          immutableCheck: false,
        }).concat(api.middleware),
    });
  const initialStore = getStore();
  const refObj = {
    api,
    store: initialStore,
    wrapper: withStoreProvider(initialStore),
  };

  let cleanupListeners;

  beforeEach(() => {
    const store = getStore();
    refObj.store = store;
    refObj.wrapper = withStoreProvider(store);

    if (!withoutListeners) {
      cleanupListeners = setupListeners(store.dispatch);
    }
  });

  afterEach(() => {
    cleanup();
    if (!withoutListeners) {
      cleanupListeners();
    }

    refObj.store.dispatch(api.unil.resetApiState());
  });
  return refObj;
};

export const customRender = (ui, options) =>
  render(ui, { wrapper: AllProvider, ...options });
