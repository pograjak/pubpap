export default function(ctx) {
  console.log(ctx);
  // console.log(ctx.store.state.user);

  // If the user is not authenticated { store, redirect }
  // if (ctx.store.state.user.id == "") {
  //   console.log("Protected page & unlogged user -> redirect to /login");
  //   console.log(ctx.store.state.user);
  //   return ctx.redirect(`/login/?nextPage=${ctx.from.path}`);
  // }
  if (!ctx.app.$fireAuth.currentUser) {  // store is not updated on one invalid login attempt, but this is
    console.log("Protected page & unlogged user -> redirect to /login");
    console.log(ctx.store.state.user);
    return ctx.redirect(`/login/?nextPage=${ctx.from.path}`);
  }
}
