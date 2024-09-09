import React from "react";
import { useInView } from "react-intersection-observer";
import "./LayzyComponent.scss";

interface LazyProps {
  children: React.ReactNode;
}
const LazyLoadComponent: React.FC<LazyProps> = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`hidden ${inView ? 'slide-up' : ''}`}>
      {children}
    </div>
  );
};

export default LazyLoadComponent;
