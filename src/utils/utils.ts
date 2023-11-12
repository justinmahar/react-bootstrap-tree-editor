import * as KeyCodeJS from 'keycode-js';
import { v4 as uuidv4 } from 'uuid';

export const key = (...values: (string | number)[]): string => {
  return values.map((val) => `${val}`).join('-');
};

export const uuid = (): string => {
  return uuidv4();
};

export const KeyCode = KeyCodeJS;
