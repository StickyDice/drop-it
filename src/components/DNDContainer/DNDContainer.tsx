import { ReactNode, RefObject, useEffect, useState } from "react";
import DNDItem from "../DNDItem/DNDItem";
import { SetState } from "../../types/set-state";
import PressedCTX from "../../context/pressedCTX/pressedCTX";

interface IProps {
  children: ReactNode[];
  className: string;
}

type CoordsType = { x: number; y: number };

export default function DNDContainer(props: IProps) {
  const { children, className } = props;

  const [filteredChildren, setFilteredChildren] = useState(children);
  const [pressedItem, setPressedItem] = useState<RefObject<HTMLElement> | null>(
    null,
  );

  useEffect(() => {
    const handleMouseMoveEvent = (e: MouseEvent) => {
      if (pressedItem) {
        const xOffset = e.clientX - 
      }
    };

    document.addEventListener("mousemove", handleMouseMoveEvent);

    return () => {
      document.removeEventListener("mousemove", handleMouseMoveEvent);
    };
  });

  return (
    <PressedCTX.Provider value={{ pressedItem, setPressedItem }}>
      <div className={className}>
        {filteredChildren.map((child) => (
          <DNDItem>{child}</DNDItem>
        ))}
      </div>
    </PressedCTX.Provider>
  );
}
