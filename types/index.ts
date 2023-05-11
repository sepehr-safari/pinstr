type Pin = string[];

type Board = {
  id: string;
  pubkey: string;
  name: string;
  headers: string[];
  pins: Pin[];
};

type PinEditorFormData = { [key: string]: string };

type Author = {
  id: string;
  picture: string;
  name: string;
  displayName: string;
  nip05: string;
  about: string;
  banner: string;
  lud06: string;
  website: string;
};

type DrawerId = 'pins-drawer' | 'boards-drawer';
