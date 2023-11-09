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

  return `${import.meta.env.VITE_IMAGE_PROXY_API_ENDPOINT}${encodeURIComponent(
    btoa(src)
  )}${queries}`;
};
