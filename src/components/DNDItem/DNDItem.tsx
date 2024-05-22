import { MouseEvent, ReactNode, useContext, useEffect, useRef } from "react";
import { PressedObjectContext } from "../../context/pressed-object-context";
import { DraggingItemCoordsContext } from "../../context/dragging-item-coords-context";
import { AllItemsCoords } from "../../context/all-items-coords";

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function DNDItem(props: IProps) {
  const { children, className } = props;
  const itemRef = useRef<HTMLDivElement | null>(null);
  const { setPressedObject } = useContext(PressedObjectContext);
  const { setCoords } = useContext(DraggingItemCoordsContext);
  const sortableItemsMap = useContext(AllItemsCoords);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setCoords({ x: e.clientX, y: e.clientY });
    setPressedObject(itemRef);
    if (itemRef?.current) {
      itemRef.current.style.transition = "";
      itemRef.current.style.zIndex = "10";
    }
  };

  const handleMouseUp = () => {
    setPressedObject(null);
    if (itemRef?.current) {
      itemRef.current.style.transition = "transform .3s ease-in-out";
      itemRef.current.style.transform = "translate(0, 0)";
      itemRef.current.style.zIndex = "1";
    }
  };

  useEffect(() => {
    if (itemRef.current) {
      sortableItemsMap.set(
        {
          x: itemRef.current.clientLeft,
          y: itemRef.current.clientTop,
        },
        itemRef,
      );
    }
  }, [itemRef.current]);

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {children}
    </div>
  );
}
