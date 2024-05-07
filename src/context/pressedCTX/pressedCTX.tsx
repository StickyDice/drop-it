import { createContext, RefObject } from "react";
import { SetState } from "../../types/set-state";

const PressedCTX = createContext<{
  pressedItem: RefObject<HTMLElement> | null;
  setPressedItem: SetState<RefObject<HTMLElement> | null>;
}>({ pressedItem: null, setPressedItem: () => {} });

export default PressedCTX;
