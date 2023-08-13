import { Boards } from '@/components';
import { FiltersNavbar } from '@/components/Navbars';

import { useBoards } from '@/queries';

export default function Home() {
  const { data } = useBoards();
  console.log(data);

  return (
    <>
      <FiltersNavbar />
      <div className="p-4 sm:p-6">
        <Boards fullWidth />
      </div>
    </>
  );
}
