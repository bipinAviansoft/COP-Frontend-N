"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import initializeStore from "./index";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = initializeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
