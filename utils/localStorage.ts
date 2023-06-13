export const getKindFromLocalStorage = () => {
  const kind = localStorage.getItem('kind');
  if (kind) {
    return +kind;
  } else {
    return 33888;
  }
};

export const setKindInLocalStorage = (kind: number) => {
  localStorage.setItem('kind', kind.toString());
};
