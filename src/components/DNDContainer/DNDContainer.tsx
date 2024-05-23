import { MutableRefObject, ReactNode, useEffect, useState } from "react";
import DNDItem from "../DNDItem/DNDItem";

interface IConatinerProps {
  children: ReactNode[];
  className?: string;
}

export default function Container(props: IConatinerProps) {
  const { children, className } = props;

  return (
    <div className={className}>
      {children.map((child) => (
        <DNDItem>{child}</DNDItem>
      ))}
    </div>
  );
}
