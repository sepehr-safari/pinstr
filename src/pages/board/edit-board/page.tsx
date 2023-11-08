import { NDKUser } from '@nostr-dev-kit/ndk';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Spinner } from '@/shared/components';
import { useBoard } from '@/shared/hooks/queries';

import { BoardWizard } from '@/features';

export const Page = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <Button
        variant="text"
        size="none"
        label="&larr; Back"
        onClick={() => navigate(-1)}
        className="mb-4"
      />

      <BoardWizard initialBoard={board} />
    </>
  );
};
