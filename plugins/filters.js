import Vue from "vue";

// Filters
Vue.filter("format-timestamp", function (stamp) {
  // return moment(stamp.toDate(), "dddd, MMMM Do YYYY");
  return "Undefined";
  // try {
  //   return .toLocaleString();
  // } catch{
  //   const d = new Date(stamp);

  //   const dtf = new Intl.DateTimeFormat("en", {
  //     year: "2-digit",
  //     month: "short",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit"
  //   });
  //   const [
  //     { value: mo }, ,
  //     { value: da }, ,
  //     { value: ye }, ,
  //     { value: hou }, ,
  //     { value: min }, ,
  //   ] = dtf.formatToParts(stamp);
  //   return `${mo} ${da}'${ye} at ${hou}:${min}`;
  // }
});
