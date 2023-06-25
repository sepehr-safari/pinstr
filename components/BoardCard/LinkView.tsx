import { useState } from 'react';

const Dropdown = ({ address }: { address: string }) => {
  return (
    <>
      <ul className="menu p-2 shadow bg-black rounded-box w-48 text-sm">
        <li>
          <div
            onClick={() =>
              window.open(
                'https://nostr.com/' + address,
                '_blank',
                'noopener noreferrer'
              )
            }
          >
            Open in nostr.com
          </div>
        </li>
        <li>
          <div
            onClick={() =>
              window.open(
                'https://iris.to/' + address,
                '_blank',
                'noopener noreferrer'
              )
            }
          >
            Open in iris.to
          </div>
        </li>
        <li>
          <div
            onClick={() =>
              window.open(
                'https://coracle.social/' + address,
                '_blank',
                'noopener noreferrer'
              )
            }
          >
            Open in coracle.social
          </div>
        </li>
      </ul>
    </>
  );
};

const LinkView = ({ address }: { address: string }) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div
      className="flex flex-col gap-2"
      tabIndex={0}
      onBlur={() => setToggleDropdown(false)}
    >
      <div
        className="text-primary cursor-pointer hover:opacity-80 z-20"
        onClick={() => setToggleDropdown((state) => !state)}
      >
        {address}
      </div>

      {toggleDropdown && <Dropdown address={address} />}
    </div>
  );
};

export default LinkView;
