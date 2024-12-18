import { DARK_THEME, LIGHT_THEME } from "../constants";
import { Theme } from "../types";

export const getValidTheme = (value: string | null): Theme => {
  if (value === LIGHT_THEME || value === DARK_THEME) {
    return value;
  }

  return LIGHT_THEME;
};
