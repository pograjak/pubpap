import { firestoreAction } from "vuexfire";

export const state = () => ({
  request: {}
});

export const getters = {
  request: state => state.request
};

export const mutations = {};

export const actions = {
  bindRequest: firestoreAction(async function({ bindFirestoreRef }) {
    await bindFirestoreRef(
      "request",
      this.$fireStore.collection("papers").doc("bVypOMp1sZ9I4R0ib5hV")
    );
  }),
  addCoin: async function(ctx) {
    this.$fireStore
      .collection("papers")
      .doc("bVypOMp1sZ9I4R0ib5hV")
      .update({ requestCurrent: this.$fireStoreObj.FieldValue.increment(1) });
  }
};
