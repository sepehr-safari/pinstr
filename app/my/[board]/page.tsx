'use client';

import { useEffect, useState } from 'react';

import { useCurrentBoard } from '@/hooks';

import { PinEditor } from '@/components';

const MyBoard = () => {
  const { currentBoard } = useCurrentBoard();
  const [initialData, setInitialData] = useState<PinEditorFormData>({
    Name: '',
  });

  useEffect(() => {
    currentBoard.headers?.forEach((header) => {
      setInitialData((prev) => ({ ...prev, [header]: '' }));
    });
  }, [currentBoard.headers]);

  return (
    <>
      <PinEditor boardName={currentBoard.name} initialData={initialData} />
    </>
  );
};

// {!pins.length && eose && <></>}

//  <label htmlFor="pins-drawer" className="btn btn-primary btn-sm lg:hidden">
//    Create a new pin
//  </label>;

export default MyBoard;
