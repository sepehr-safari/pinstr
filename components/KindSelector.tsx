'use client';

import { getKindFromLocalStorage, setKindInLocalStorage } from '@/utils';
import { useState } from 'react';

const KindSelector = () => {
  const [kind, setKind] = useState<number>(getKindFromLocalStorage());

  const handleKindChange = (kind: number) => {
    setKind(kind);
    setKindInLocalStorage(kind);
    window.location.reload();
  };

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-sm">
          Kinds
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-56 text-sm md:w-64"
        >
          <li>
            <a
              className={`flex flex-col gap-0${
                kind === 33888 ? ' active' : ''
              }`}
              onClick={() => handleKindChange(33888)}
            >
              <span>Generic Lists</span>
              <span>(kind: 33888)</span>
            </a>
          </li>
          <li>
            <a
              className={`flex flex-col gap-0${
                kind === 10000 ? ' active' : ''
              }`}
              onClick={() => handleKindChange(10000)}
            >
              <span>Mute Lists</span>
              <span>(kind: 10000)</span>
            </a>
          </li>
          <li>
            <a
              className={`flex flex-col gap-0${
                kind === 30000 ? ' active' : ''
              }`}
              onClick={() => handleKindChange(30000)}
            >
              <span>Categorized People lists</span>
              <span>(kind: 30000)</span>
            </a>
          </li>
          <li>
            <a
              className={`flex flex-col gap-0${
                kind === 30001 ? ' active' : ''
              }`}
              onClick={() => handleKindChange(30001)}
            >
              <span>Categorized Bookmark lists</span>
              <span>(kind: 30001)</span>
            </a>
          </li>
          <li>
            <a
              className={`flex flex-col gap-0${kind === -1 ? ' active' : ''}`}
              onClick={() => handleKindChange(-1)}
            >
              <span>Hybrid</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default KindSelector;
