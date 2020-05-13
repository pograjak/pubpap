export default function(ctx) {
  console.log(ctx);

  // If the user is not authenticated { store, redirect }
  if (ctx.store.state.user.email == "") {
    return ctx.redirect(`/login/?nextPage=${ctx.from.path}`);
  }
}
