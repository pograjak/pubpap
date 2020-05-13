import { firestoreAction } from "vuexfire";

export const state = () => ({
  threads: [],
  replies: [],
  voteState: 0
});

export const getters = {
  threads: state => state.threads,
  replies: state => state.replies,
  voteState: state => state.voteState
};

export const mutations = {};

export const actions = {
  bindThreads: firestoreAction(async function ({ bindFirestoreRef }, item) {
    await bindFirestoreRef(
      "threads",
      this.$fireStore
        .collection("papers")
        .doc(item.paperId)
        .collection("threads")
        .orderBy("votes", "desc")
    );
  }),

  bindReplies: firestoreAction(async function (
    { bindFirestoreRef },
    item
  ) {
    await bindFirestoreRef(
      "replies",
      this.$fireStore
        .collection("papers")
        .doc(item.paperId)
        .collection("threads")
        .doc(item.threadId)
        .collection("replies")
        .orderBy("createdAt")
    );
  }),

  bindVoteState: firestoreAction(async function ({ bindFirestoreRef }, item) {
    await bindFirestoreRef(
      "voteState",
      this.$fireStore
        .collection("papers")
        .doc(item.paperId)
        .collection("threads")
        .doc(item.threadId)
        .collection("user_votes")
        .doc(item.userId)
    );
  }),

  addThread: async function (context, payload) {
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
  },

  vote: async function (context, item) {
    var voteRef = this.$fireStore  // add a vote
      .collection("papers")
      .doc(item.paperId)
      .collection("threads")
      .doc(item.threadId)
      .collection('user_votes')
      .doc(item.userId);
    if (item.state != 0) {
      await voteRef.set({ 'v': item.state });
    } else {
      await voteRef.delete();
    }
  },

  addComment: async function (context, item) {
    const comment = {
      text: item.text,
      userId: item.userId,
      createdAt: this.$fireStoreObj.FieldValue.serverTimestamp(),
      userName: item.userName
    };

    await this.$fireStore
      .collection("papers")
      .doc(item.paperId)
      .collection("threads")
      .doc(item.threadId)
      .collection("replies")
      .doc()
      .set(comment);
  }
};
