import { defineStore } from "pinia";
import { stringify } from "qs";
import { Names } from "./store.name";

export const mainStore = defineStore(Names.Main, {
  state: () => {
    return {
      userNumber: "",
      userName: "",
      telephoneNumber: "",
    };
  },
  getters: {},
  actions: {},
});
