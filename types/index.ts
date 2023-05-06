type Pins = {
  [name: string]: string[];
};

type Boards = {
  [d: string]: {
    headers: string[];
    pins: Pins;
  };
};

type PinEditorFormData = { [header: string]: string };
