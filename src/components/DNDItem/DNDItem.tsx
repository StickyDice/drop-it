import {
  DragEvent,
  MutableRefObject,
  ReactNode,
  useRef,
  useState,
} from "react";

interface IProps {
  children: ReactNode;
  className?: string;
}

export default function DNDItem(props: IProps) {
  const { children, className } = props;
  const itemRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [pressedObject, setPressedObject] =
    useState<MutableRefObject<HTMLDivElement | null> | null>(null);

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    setCoords({ x: e.clientX, y: e.clientY });
    setPressedObject(itemRef);
    if (itemRef?.current) {
      itemRef.current.style.transition = "";
      itemRef.current.style.zIndex = "10";
    }
    const img = document.createElement("img");
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    if (!pressedObject || !pressedObject?.current) return;

    const xOffset = e.clientX - coords.x;
    const yOffset = e.clientY - coords.y;
    pressedObject.current.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  };

  const handleDragEnd = () => {
    setPressedObject(null);
    if (itemRef?.current) {
      itemRef.current.style.transition = "transform .3s ease-in-out";
      itemRef.current.style.transform = "translate(0, 0)";
      itemRef.current.style.zIndex = "1";
    }
  };

  return (
    <div
      ref={itemRef}
      className={className}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
    >
      {children}
    </div>
  );
}
