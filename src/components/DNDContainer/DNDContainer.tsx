import {
  MutableRefObject,
  ReactNode,
  RefObject,
  useEffect,
  useState,
} from "react";
import DNDItem from "../DNDItem/DNDItem";
import { PressedObjectContext } from "../../context/pressed-object-context";
import { DraggingItemCoordsContext } from "../../context/dragging-item-coords-context";
import { AllItemsCoords } from "../../context/all-items-coords";

interface IProps {
  children: ReactNode[];
  className?: string;
}

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
    <AllItemsCoords.Provider value={sortableItemsMap}>
      <PressedObjectContext.Provider
        value={{ pressedObject, setPressedObject }}
      >
        <DraggingItemCoordsContext.Provider
          value={{ coords: cursorPos, setCoords: setCursorPos }}
        >
          <div className={className}>
            {filteredChildren.map((child) => (
              <DNDItem>{child}</DNDItem>
            ))}
          </div>
        </DraggingItemCoordsContext.Provider>
      </PressedObjectContext.Provider>
    </AllItemsCoords.Provider>
  );
}
