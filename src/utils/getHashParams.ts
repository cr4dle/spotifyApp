export const getHashParams: () => object = () => {
  const hashParams: object = {};
  let e: RegExpExecArray | null;
  const r = new RegExp(/([^&;=]+)=?([^&;]*)/g),
    q: string = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};
