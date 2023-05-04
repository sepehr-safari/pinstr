import Image from 'next/image';

import Item from './Item';

interface ItemsParams {
  items: any[];
  eose: boolean;
  activeItem: string | undefined;
}

const Items = ({ eose, items, activeItem }: ItemsParams) => {
  return (
    <>
      {!items.length && !eose ? (
        <button className="loading btn-xs btn rounded-none" />
      ) : !items.length && eose ? (
        <Image
          src="/empty.png"
          alt="Empty"
          width={200}
          height={200}
          className="mx-auto"
        />
      ) : null}

      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          name={item.name}
          isActive={item.id === activeItem}
        />
      ))}
    </>
  );
};

export default Items;
