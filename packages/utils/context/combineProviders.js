import { createElement } from 'react';

export const CombineProviders = ({ children, contexts }) => contexts.reverse().reduce(
  (prev, it) => {
    const [ctx, props] = [it, {}].flat();
    return createElement(ctx, { children: prev, ...props });
  },
  children,
);

export default CombineProviders;
