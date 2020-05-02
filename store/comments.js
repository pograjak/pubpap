import { firestoreAction } from "vuexfire";

export const state = () => ({
  comments: []
});

export const getters = {
  comments: state => state.comments
};

export const mutations = {};

export const actions = {
  bindComments: firestoreAction(async function({ bindFirestoreRef }) {
    await bindFirestoreRef(
      "comments",
      this.$fireStore
        .collection("papers")
        .doc("bVypOMp1sZ9I4R0ib5hV")
        .collection("comments")
    );
  })
};
