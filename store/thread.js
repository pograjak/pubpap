import { firestoreAction } from "vuexfire";

export const state = () => ({
  thread: {},
  replies: [],
  voteState: 0
});

export const getters = {
  thread: state => state.thread,
  replies: state => state.replies,
  voteState: state => {
    return state.voteState ? state.voteState.v : 0
  }
};

export const mutations = {};

export const actions = {
  bindThread: firestoreAction(async function({ bindFirestoreRef }, { paperId, threadId }) {
    let t = await bindFirestoreRef(
      "thread",
      this.$fireStore
        .collection("papers")
        .doc(paperId)
        .collection("threads")
        .doc(threadId)
    );
    if(t){
      return true;
    }
    return false;
  }),

  bindReplies: firestoreAction(async function(
    { bindFirestoreRef },
    { paperId, threadId }
  ) {
    let p = await bindFirestoreRef(
      "replies",
      this.$fireStore
        .collection("papers")
        .doc(paperId)
        .collection("threads")
        .doc(threadId)
        .collection("replies")
        .orderBy("createdAt")
    );
  }),

  bindVoteState: firestoreAction(async function({ bindFirestoreRef }, { paperId, threadId, userId }) {
    await bindFirestoreRef(
      "voteState",
      this.$fireStore
        .collection("papers")
        .doc(paperId)
        .collection("threads")
        .doc(threadId)
        .collection("user_votes")
        .doc(userId)
    );
  }),

  vote: async function(context, { paperId, threadId, userId, state }) {
    var voteRef = this.$fireStore // add a vote
      .collection("papers")
      .doc(paperId)
      .collection("threads")
      .doc(threadId)
      .collection("user_votes")
      .doc(userId);
    if (state != 0) {
      await voteRef.set({ v: state });
    } else {
      await voteRef.delete();
    }
  },

  addReply: async function(context, { paperId, threadId, userId, userName, text}) {
    const comment = {
      text: text,
      userId: userId,
      createdAt: this.$fireStoreObj.FieldValue.serverTimestamp(),
      userName: userName
    };

    await this.$fireStore
      .collection("papers")
      .doc(paperId)
      .collection("threads")
      .doc(threadId)
      .collection("replies")
      .doc()
      .set(comment);
  }
};
