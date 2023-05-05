// export interface Pin {
//   id: string;
//   [key: string]: string;
// }

// export interface Board {
//   id: string;
//   name: string;
// }

type Pin = Map<string, string>; // Map<key, value>
type Pins = Map<string, Pin>; // Map<name, Pin>
type Boards = Map<string, Pins>; // Map<d, Pins>
