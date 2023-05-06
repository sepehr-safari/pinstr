'use client';

import { useCurrentBoard } from '@/hooks';

import { PinEditor } from '@/components';

const MyPin = () => {
  const { currentBoard, currentPin } = useCurrentBoard();

  return (
    <>
      <PinEditor
        boardName={currentBoard.name}
        initialData={currentPin.items}
        pinName={currentPin.name}
      />
    </>
  );
};

// {!pins.length && eose && <></>}

//  <label htmlFor="pins-drawer" className="btn btn-primary btn-sm lg:hidden">
//    Create a new pin
//  </label>;

export default MyPin;
