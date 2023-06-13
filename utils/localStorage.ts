export const getKindFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return -1;
  }

  const kind = window.localStorage.getItem('kind');
  if (kind) {
    return +kind;
  } else {
    return -1;
  }
};

export const setKindInLocalStorage = (kind: number) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('kind', kind.toString());
  }
};
