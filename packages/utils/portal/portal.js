import { createPortal } from 'react-dom';

export const makePortalComponent = (usePortal) => {
  const Portal = ({ children }) => {
    const { ref } = usePortal();
    if (!ref) {
      return null;
    }
    return createPortal(children, ref);
  };
  return Portal;
};

export default makePortalComponent;
