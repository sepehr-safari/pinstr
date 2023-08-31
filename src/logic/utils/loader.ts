export const loader = (src: string, opt?: { w?: number; h?: number }) => {
  if (src.endsWith('.gif')) {
    return src;
  }

  let queries = '';
  if (opt) {
    queries = '?';
    if (opt.w) {
      queries += `w=${opt.w}&`;
    }
    if (opt.h) {
      queries += `h=${opt.h}`;
    }
  }

  return `https://img.pinstr.app/${encodeURIComponent(btoa(src))}${queries}`;
};
