import { MouseEvent, ReactNode, useContext, useEffect, useRef } from "react";
import PressedCTX from "../../context/pressedCTX/pressedCTX";

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function DNDItem(props: IProps) {
  const { children, className } = props;
  const itemRef = useRef<HTMLDivElement | null>(null);

  const { setPressedItem } = useContext(PressedCTX);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setPressedItem(itemRef);
    if (itemRef?.current) {
      itemRef.current.style.transition = "";
      itemRef.current.style.zIndex = "10";
    }
  };

  const handleMouseUp = () => {
    if (itemRef?.current) {
      itemRef.current.style.transition = "x .3s ease-in-out, y .3s ease-in-out";
      itemRef.current.style.transform = "translate(0, 0)";
      itemRef.current.style.zIndex = "1";
    }
  };

  useEffect(() => {
    if (itemRef.current) {
      //
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
