import { NDKUser } from '@nostr-dev-kit/ndk';
import { useParams } from 'react-router-dom';

import { Spinner, Text } from '@/shared/components';
import { useBoard } from '@/shared/hooks/queries';

import { PinWizard } from '@/features';

export const Page = () => {
  const { npub, title, pinIndex } = useParams();

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
    return <Text variant="h4">Board not found!</Text>;
  }

  if (pinIndex == undefined) {
    return <Text variant="h4">Pin not defined!</Text>;
  }

  if (parseInt(pinIndex) > board.pins.length - 1) {
    return <Text variant="h4">Pin not found!</Text>;
  }

  return (
    <>
      <PinWizard initialBoard={board} pinIndex={parseInt(pinIndex)} mode="edit" />
    </>
  );
};
