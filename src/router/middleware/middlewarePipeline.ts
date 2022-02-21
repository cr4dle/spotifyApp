// @ts-ignore
// tslint:disable-next-line:typedef
export default function middlewarePipeline(context, middleware, index) {
  if (!middleware[index]) {
    return context.next;
  }

  return () => {
    const nextPipeline = middlewarePipeline(context, middleware, index + 1);
    // @ts-ignore
    nextMiddleware({ ...context, next: nextPipeline });
  };
}
