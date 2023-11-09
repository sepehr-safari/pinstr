import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components';

import { BoardWizard } from '@/features';

export const Page = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="text"
        size="none"
        label="&larr; Back"
        onClick={() => navigate(-1)}
        className="mb-4"
      />

      <BoardWizard initialBoard={null} />
    </>
  );
};
