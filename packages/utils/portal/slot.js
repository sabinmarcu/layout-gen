import { createElement, useRef, useEffect } from 'react';

export const makeSlot = (usePortal) => {
  const PortalSlot = ({ Component = 'div' }) => {
    const ref = useRef();
    const { setRef } = usePortal();
    useEffect(
      () => setRef(ref.current),
      [ref, setRef],
    );
    return createElement(Component, { ref });
  };
  return PortalSlot;
};

export default makeSlot;
