export const numberEllipsis = (number: string, length: number) =>
  number.length > length
    ? '+' +
      Array(number.length - 1)
        .fill('9')
        .join('')
    : number;
