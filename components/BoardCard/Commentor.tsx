'use client';

import { usePubkey } from 'nostr-hooks';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useComment, useMetadata } from '@/hooks';

type Params = {
  board: Board;
  invalidate: () => void;
};

const Commentor = ({ board, invalidate }: Params) => {
  const pubkey = usePubkey();
  const { picture } = useMetadata({ pubkey });
  const { commentOnBoard } = useComment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SimpleFormData>();

  const onSubmit = useCallback((data: SimpleFormData) => {
    commentOnBoard(data['comment'], board, invalidate);
    reset();
  }, []);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 w-full">
        <div className="avatar">
          <div className="w-7 rounded-xl">
            <img src={picture || '/pinstr.png'} />
          </div>
        </div>

        <form
          className="flex items-center gap-2 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Add a comment..."
            className="input input-xs bg-neutral text-neutral-content w-full"
            autoComplete="off"
            autoFocus
            defaultValue={''}
            {...register('comment', {
              required: true,
            })}
          />

          <button type="submit" className="btn btn-xs btn-primary">
            Send
          </button>
        </form>
      </div>

      {errors['comment']?.type === 'required' && (
        <span className="text-warning text-sm">
          Please enter a valid comment.
        </span>
      )}
    </div>
  );
};

export default Commentor;
