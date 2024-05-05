import {
  createContext,
  MutableRefObject,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import DNDItem from "../DNDItem/DNDItem";
import { SetState } from "../../types/set-state";

interface IProps {
  children: ReactNode[];
  className: string;
}

type CoordsType = { x: number; y: number };

export const PressedContext = createContext<{
  pressedObject: RefObject<HTMLElement> | null;
  setPressedObject: SetState<RefObject<HTMLElement> | null>;
}>({
  pressedObject: null,
  setPressedObject: () => {},
});

export const ItemCoordsContext = createContext<{
  coords: CoordsType;
  setCoords: SetState<CoordsType>;
}>({ coords: { x: 0, y: 0 }, setCoords: () => {} });

export const SavedSortableItemsContext = createContext<
  Map<{ x: number; y: number }, MutableRefObject<HTMLElement | null>>
>(new Map());

export default function DNDContainer(props: IProps) {
  const { children, className } = props;
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [pressedObject, setPressedObject] =
    useState<RefObject<HTMLElement> | null>(null);

  const sortableItemsMap = new Map<
    { x: number; y: number },
    MutableRefObject<HTMLElement | null>
  >();

  const [filteredChildren, setFilteredChildren] = useState(children);

  useEffect(() => {
    const handleMouseMoveEvent = (e: MouseEvent) => {
      if (!pressedObject || !pressedObject?.current) return;

      const xOffset = e.clientX - cursorPos.x;
      const yOffset = e.clientY - cursorPos.y;
      pressedObject.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    };

    document.addEventListener("mousemove", handleMouseMoveEvent);

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveEvent);
    };
  });

  return (
    <SavedSortableItemsContext.Provider value={sortableItemsMap}>
      <PressedContext.Provider value={{ pressedObject, setPressedObject }}>
        <ItemCoordsContext.Provider
          value={{ coords: cursorPos, setCoords: setCursorPos }}
        >
          <div className={className}>
            {filteredChildren.map((child) => (
              <DNDItem>{child}</DNDItem>
            ))}
          </div>
        </ItemCoordsContext.Provider>
      </PressedContext.Provider>
    </SavedSortableItemsContext.Provider>
  );
}
