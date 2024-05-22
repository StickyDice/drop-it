import { createContext } from "react";
import { SetState } from "../types/set-state";

type CoordsType = { x: number; y: number };

export const DraggingItemCoordsContext = createContext<{
  coords: CoordsType;
  setCoords: SetState<CoordsType>;
}>({ coords: { x: 0, y: 0 }, setCoords: () => {} });
