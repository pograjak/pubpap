import { firestoreAction, firestoreOptions } from "vuexfire";

firestoreOptions.reset = false;

export const state = () => ({
  request: {}
});

export const getters = {
  request: state => state.request
};

export const mutations = {};

export const actions = {
  bindRequest: firestoreAction(async function({ bindFirestoreRef }, paperId) {
    await bindFirestoreRef(
      "request",
      this.$fireStore.collection("papers").doc(paperId)
    );
  })
};
