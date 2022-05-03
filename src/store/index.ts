import { defineStore } from "pinia";
import { stringify } from "qs";
import { Names } from "./store.name";

export const mainStore = defineStore(Names.Main, {
  state: () => {
    return {
      userNumber: "",
      userName: "",
      toKen: "",
    };
  },
  getters: {},
  actions: {},
});
