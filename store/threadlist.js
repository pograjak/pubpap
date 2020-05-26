import { firestoreAction } from "vuexfire";

export const state = () => ({
  threads: []
});

export const getters = {
  threads: state => state.threads
};

export const mutations = {};

export const actions = {
  bindThreads: firestoreAction(async function(
    { bindFirestoreRef },
    { paperId }
  ) {
    await bindFirestoreRef(
      "threads",
      this.$fireStore
        .collection("papers")
        .doc(paperId)
        .collection("threads")
        .orderBy("votes", "desc")
    );
  }),

  addThread: async function(context, payload) {
    const thread = {
      text: payload.text,
      title: payload.title,
      votes: 0,
      userId: payload.userId,
      userName: payload.userName,
      createdAt: this.$fireStoreObj.FieldValue.serverTimestamp()
    };

    await this.$fireStore
      .collection("papers")
      .doc(payload.paperId)
      .collection("threads")
      .doc()
      .set(thread);
  }
};
