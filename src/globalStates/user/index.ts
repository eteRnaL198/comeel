import { atom } from "recoil";
import { RECOIL_ATOM_KEYS } from "globalStates/atomKeys";
import { User } from "common/types";

export const userState = atom<User | undefined>({
  key: RECOIL_ATOM_KEYS.USER,
  default: undefined,
});
