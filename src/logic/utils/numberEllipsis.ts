export const numberEllipsis = (number: number) => {
  const num = number;
  if (num >= 1_000_000) {
    const result = (num / 1_000_000).toFixed(1);
    return result.endsWith('.0') ? result.slice(0, -2) + 'M' : result + 'M';
  } else if (num >= 1_000) {
    const result = (num / 1_000).toFixed(1);
    return result.endsWith('.0') ? result.slice(0, -2) + 'K' : result + 'K';
  } else {
    return num.toString();
  }
};
