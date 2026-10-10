// react-markdown hands every custom component a `node` prop (the syntax-tree node). Spreading the props onto a DOM element writes it into the HTML as
// `node="[object Object]"`, which is invalid markup. Drop it before spreading.
export function domProps<T extends { node?: unknown }>(props: T): Omit<T, "node"> {
  const { node, ...rest } = props;
  void node;
  return rest;
}
