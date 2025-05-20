const singleton = <Value>(name: string, factory: () => Value): Value => {
  (global as any).__yolo__ ??= {};
  (global as any).__yolo__[name] ??= factory();
  return (global as any).__yolo__[name];
};

export { singleton };
