import { parseString } from "xml2js";

export async function fetchArxiv(paperUrl) {
  if (paperUrl.length < 1) {
    throw "Invalid url entered";
  }

  const paperId = /[^/]*$/.exec(paperUrl)[0];
  // console.log(paperId);
  const resp = await fetch(
    // `http://export.arxiv.org/api/query?search_query=${paperId}&start=0&max_results=10`
    `http://export.arxiv.org/api/query?id_list=${paperId}&sortBy=lastUpdatedDate&sortOrder=descending
&start=0&max_results=1`
  );

  const data = await resp.text();

  let ret = {};
  parseString(data, (err, result) => {
    // console.log(err);
    // Fill in variables

    if (result.feed.entry[0].title[0] == "Error") {
      console.log(result.feed.entry[0]);
      throw "Arxiv responded with error";
    }

    

    ret["title"] = result.feed.entry[0].title[0]
      .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines & double spaces
      .replace(/\s+/g, " ")
      .trim();

    ret["summary"] = result.feed.entry[0].summary[0]
      .replace(/(\r\n|\n|\r)/gm, " ")
      .replace(/\s+/g, " ")
      .trim();

    let auth_arr = []; // authors
    for (const i in result.feed.entry[0].author) {
      // console.log(result.feed.entry[0].author[i].name);
      auth_arr.push(result.feed.entry[0].author[i].name);
    }
    ret["authors"] = auth_arr.join(", ");
    ret["arxLink"] = result.feed.entry[0].id[0];
    
    
  });

  console.log(ret);
  return ret;
}
