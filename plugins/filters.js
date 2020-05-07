import Vue from "vue";

// Filters
Vue.filter("format-timestamp", function(stamp) {
    const d = new Date(stamp);
    const dtf = new Intl.DateTimeFormat("en", {
      year: "2-digit",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
    const [
      { value: mo },,
      { value: da },,
      { value: ye },,
      { value: hou },,
      { value: min },,
    ] = dtf.formatToParts(d);
    return `${mo} ${da}'${ye} at ${hou}:${min}`;
  });
  