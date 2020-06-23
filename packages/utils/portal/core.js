import { makePortalComponent } from './portal';
import { makeSlot } from './slot';
import { makeContext } from './context';

export const makePortal = (defaultValue = null) => {
  const { Provider, Context, usePortal } = makeContext(defaultValue);
  const Portal = makePortalComponent(usePortal);
  const Slot = makeSlot(usePortal);
  return {
    Provider,
    Context,
    Portal,
    Slot,
  };
};

export default makePortal;
