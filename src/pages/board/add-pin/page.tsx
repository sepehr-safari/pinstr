import { NDKUser } from '@nostr-dev-kit/ndk';
import { useParams } from 'react-router-dom';

import { Spinner } from '@/shared/components';
import { useBoard } from '@/shared/hooks/queries';

import { PinWizard } from '@/features';

export const Page = () => {
  const { npub, title } = useParams();

  const ndkUser = npub ? new NDKUser({ npub }) : undefined;
  const author = ndkUser?.pubkey;

  const board = useBoard({ author, title });

  if (board == undefined) {
    return (
      <div className="h-32 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (board == null) {
    return <div>Board not found!</div>;
  }

  const pinIndex = board.pins ? board.pins.length : 0;

  return (
    <>
      <PinWizard initialBoard={board} pinIndex={pinIndex} mode="add" />
    </>
  );
};
