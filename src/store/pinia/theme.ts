import { DEFAULT_THEME } from "@/constants";
import { defineStore } from "pinia";

const theme = defineStore("theme", {
  state: () => ({
    themeType: DEFAULT_THEME
  }),
  actions: {
    changeThemeType(newTheme: any) {
      this.themeType = newTheme;
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ["themeType"] }]
  }
});

export default theme;
