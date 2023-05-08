type Pin = string[];

type Board = {
  id: string;
  pubkey: string;
  name: string;
  headers: string[];
  pins: Pin[];
};

type PinEditorFormData = { [key: string]: string };
