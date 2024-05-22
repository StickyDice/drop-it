import { createContext, MutableRefObject } from "react";

export const AllItemsCoords = createContext<
  Map<{ x: number; y: number }, MutableRefObject<HTMLElement | null>>
>(new Map());
