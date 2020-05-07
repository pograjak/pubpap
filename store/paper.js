import { firestoreAction } from "vuexfire";

export const state = () => ({
  paper: {
    title: "",
    authors: "",
    summary: ""
  }
});

export const getters = {
  paper: state => state.paper
};

export const mutations = {};

export const actions = {
  bindPaper: firestoreAction(async function({ bindFirestoreRef }, paperId) {
    console.log(paperId);

    await bindFirestoreRef(
      "paper",
      this.$fireStore.collection("papers").doc(paperId)
    );
  })
};
