import { createContext, RefObject } from "react";
import { SetState } from "../types/set-state";

export const PressedObjectContext = createContext<{
  pressedObject: RefObject<HTMLElement> | null;
  setPressedObject: SetState<RefObject<HTMLElement> | null>;
}>({
  pressedObject: null,
  setPressedObject: () => {},
});
