import { RectangleStackIcon } from '@heroicons/react/24/outline';

import { FormatFilterMenu } from '@/features';

import { Button, Input, Modal, Text } from '@/shared/components';
import { Format } from '@/shared/types';

import { useFeaturesTool } from './hooks';
import { FeaturesToolProps } from './types';

export const FeaturesTool = ({ initialBoard, setPartialBoardItem }: FeaturesToolProps) => {
  const {
    format,
    insertFeature,
    isShowingFeaturesTool,
    setFormat,
    setIsShowingFeaturesTool,
    setTitle,
    title,
  } = useFeaturesTool({ initialBoard, setPartialBoardItem });

  return (
    <>
      <Button
        block
        variant="outline"
        label="Features Tool"
        icon={<RectangleStackIcon />}
        onClick={() => setIsShowingFeaturesTool((prev) => !prev)}
      />

      {isShowingFeaturesTool && (
        <Modal onClose={() => setIsShowingFeaturesTool(false)}>
          <div className="flex flex-col gap-6">
            <div>
              <Text variant="h3">{`Features Tool`}</Text>
              <Text variant="xs">{`Use this tool to add a new feature to your pin.`}</Text>
            </div>

            <div className="">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Text variant="h4">{`Format`}</Text>

                  <Text variant="h5" className="ml-auto">
                    {`(Required)`}
                  </Text>
                </div>
              </div>

              <div className="mt-2">
                <FormatFilterMenu
                  selected={format}
                  setSelected={(selected) => setFormat(selected.title as Format)}
                  hideFirstOption
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Text variant="h4">{`Title`}</Text>

                <Text variant="h5" className="ml-auto">
                  {`(Required)`}
                </Text>
              </div>

              <Input
                placeholder='e.g. "Link to buy this product"'
                value={title}
                onChange={(e) => setTitle(String(e.target.value))}
              />
            </div>

            <div className="mt-2 flex justify-end">
              <Button
                variant="primary"
                block
                rounded
                size="lg"
                label="Insert Feature"
                onClick={insertFeature}
              />
            </div>

            <Text variant="xs" className="text-center">
              {`Features are shared across all pins in a board. They can be used to add extra structured data to your pins, such as links to buy products.`}
            </Text>
          </div>
        </Modal>
      )}
    </>
  );
};
