import { CategoryFilterMenu, FormatFilterMenu, ImageSelector, DeleteBoard } from '@/features';
import { useState } from 'react';

import { Board, Format } from '@/shared/types';
import { capitalizeFirstLetter, getBoardHeadersByFormat } from '@/shared/utils';
import { Button, Input, Text } from '@/shared/components';
import { useMutateBoard } from '@/shared/hooks/mutations';

type Props = {
  initialBoard: Board | null;
};

export const BoardWizard = ({ initialBoard }: Props) => {
  const [partialBoard, setPartialBoard] = useState<Partial<Board>>(initialBoard || {});

  const { publishBoard, isLoading } = useMutateBoard();

  const setPartialBoardItem = (key: keyof Board, value: any) => {
    setPartialBoard((board) => ({ ...board, [key]: value }));
  };

  const canSubmit = Boolean(
    partialBoard &&
      partialBoard.format != undefined &&
      partialBoard.category != undefined &&
      partialBoard.title != undefined &&
      partialBoard.description != undefined &&
      partialBoard.image != undefined
  );

  return (
    <>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <Text variant="h3">{initialBoard ? `Edit your board` : `Create a new board`}</Text>

          <Text variant="xs">
            {initialBoard
              ? `Edit the details below to update your board.`
              : `Fill in the form below to create a new board.`}
          </Text>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text variant="h4">{`Title`}</Text>
                <Text variant="h5" className="ml-auto">
                  {`(Required)`}
                </Text>
              </div>
              <Text variant="xs">{`Choose a fancy title for your board.`}</Text>
            </label>
            <div className="mt-2">
              <Input
                variant="primary"
                name="title"
                id="title"
                value={partialBoard.title || ''}
                onChange={(e) => setPartialBoardItem('title', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text variant="h4">{`Description`}</Text>
                <Text variant="h5" className="ml-auto">
                  {`(Required)`}
                </Text>
              </div>
              <Text variant="xs">{`Explain what this board is about in a few words.`}</Text>
            </label>
            <div className="mt-2">
              <Input
                variant="primary"
                name="description"
                id="description"
                value={partialBoard.description || ''}
                onChange={(e) => setPartialBoardItem('description', e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text variant="h4">{`Format`}</Text>
                <Text variant="h5" className="ml-auto">
                  {`(Required)`}
                </Text>
              </div>
              <Text variant="xs">{`Select a format for your board. This can NOT be changed later.`}</Text>
            </div>
            <div className="mt-2">
              <FormatFilterMenu
                selected={partialBoard.format}
                setSelected={(selected) => {
                  setPartialBoardItem('format', selected.title);
                  setPartialBoardItem('headers', getBoardHeadersByFormat(selected.title as Format));
                }}
                hideFirstOption
                disabled={!!initialBoard}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text variant="h4">{`Category`}</Text>
                <Text variant="h5" className="ml-auto">
                  {`(Required)`}
                </Text>
              </div>
              <Text variant="xs">{`Select a suitable category for your board.`}</Text>
            </div>
            <div className="mt-2">
              <CategoryFilterMenu
                selected={partialBoard.category}
                setSelected={(value) => setPartialBoardItem('category', value.title)}
                hideFirstOption
              />
            </div>
          </div>

          <div>
            <label htmlFor="tags" className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text variant="h4">{`Tags`}</Text>
                <Text variant="h5" className="ml-auto">
                  {`(Required)`}
                </Text>
              </div>
              <Text variant="xs">
                {`Add a few space separated tags to help people find your board easier.`}
              </Text>
            </label>
            <div className="mt-2">
              <Input
                variant="primary"
                name="tags"
                id="tags"
                value={partialBoard.tags?.join(' ') || ''}
                onChange={(event) =>
                  setPartialBoardItem(
                    'tags',
                    event.target.value
                      ? event.target.value
                          .split(' ')
                          .filter((t, i, a) => a.indexOf(t) === i)
                          .map(capitalizeFirstLetter)
                      : []
                  )
                }
              />
            </div>

            {partialBoard.tags && partialBoard.tags.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {partialBoard.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Text variant="h4">{`Cover Image`}</Text>
                <Text variant="h5" className="ml-auto">
                  {`(Required)`}
                </Text>
              </div>
              <Text variant="xs">
                {`Select an option and choose a high quality image that represents your board.`}
              </Text>
            </div>
            <div className="mt-2">
              <ImageSelector
                image={partialBoard.image}
                setImage={(value) => setPartialBoardItem('image', value)}
              />
            </div>
          </div>

          <div>
            <Button
              block
              variant="primary"
              size="lg"
              disabled={!canSubmit || isLoading}
              label={initialBoard ? 'Update' : 'Create'}
              onClick={() => publishBoard(partialBoard)}
            />
          </div>

          {initialBoard && <DeleteBoard board={initialBoard} />}
        </div>
      </div>
    </>
  );
};
