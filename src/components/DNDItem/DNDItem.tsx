import { MouseEvent, ReactNode, useContext, useRef } from "react";
import {
  ItemCoordsContext,
  PressedContext,
} from "../DNDContainer/DNDContainer";

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function DNDItem(props: IProps) {
  const { children, className } = props;
  const itemRef = useRef<HTMLDivElement>(null);
  const { setPressedObject } = useContext(PressedContext);
  const { setCoords } = useContext(ItemCoordsContext);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setCoords({ x: e.clientX, y: e.clientY });
    setPressedObject(itemRef);
    if (itemRef?.current) {
      itemRef.current.style.transition = "";
    }
  };

  const handleMouseUp = () => {
    setPressedObject(null);
    if (itemRef?.current) {
      itemRef.current.style.transition = "transform .3s ease-in-out";
      itemRef.current.style.transform = "translate(0, 0)";
    }
  };

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
