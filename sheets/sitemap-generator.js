// UPDATE DATE FROM FOOTER COPYRIGHT CODE
document.getElementById("year").textContent = new Date().getFullYear();


const generateBtn =
  document.getElementById("generateBtn");

const downloadBtn =
  document.getElementById("downloadBtn");

const output =
  document.getElementById("output");

const statusText =
  document.getElementById("status");

const pageInfo =
  document.getElementById("pageInfo");

const resultsTable =
  document.getElementById("resultsTable");

const resultsBody =
  document.getElementById("resultsBody");

let sitemapXML = "";

// Escape XML
function escapeXML(str){

  return str.replace(/[<>&'"]/g,function(char){

    switch(char){

      case "<":
        return "&lt;";

      case ">":
        return "&gt;";

      case "&":
        return "&amp;";

      case "'":
        return "&apos;";

      case '"':
        return "&quot;";
    }
  });
}

// Validate URL
function isValidURL(url){

  try{
    new URL(url);
    return true;
  }catch{
    return false;
  }
}

// Normalize URL
function normalizeURL(url){

  return url
    .split("#")[0]
    .replace(/\/$/, "");
}

// Calculate Smart Priority
function calculatePriority(url, baseURL){

  const path =
    new URL(url).pathname;

  // Homepage
  if(
    url === baseURL ||
    path === "/"
  ){
    return "1.0";
  }

  // Important Pages
  const importantKeywords = [
    "about",
    "services",
    "products",
    "pricing",
    "contact",
    "shop",
    "blog"
  ];

  for(const keyword of importantKeywords){

    if(path.includes(keyword)){
      return "0.9";
    }
  }

  // Medium Priority
  if(path.split("/").length <= 3){
    return "0.8";
  }

  // Lower Priority
  return "0.7";
}

// Detect Change Frequency
function detectChangeFreq(url){

  const path =
    new URL(url).pathname;

  if(
    path.includes("blog") ||
    path.includes("news")
  ){
    return "daily";
  }

  if(
    path.includes("product") ||
    path.includes("shop")
  ){
    return "weekly";
  }

  return "monthly";
}

// Crawl Website
async function crawlWebsite(baseURL){

  const visited = new Set();

  const pages = [];

  async function crawl(url){

    url = normalizeURL(url);

    if(visited.has(url)) return;

    visited.add(url);

    statusText.innerHTML =
      `<span class="success">Scanning site please wait: ${url}</span>` ;

    try{

      const response =
        await fetch(url);

      if(!response.ok) return;

      const contentType =
        response.headers.get("content-type");

      if(
        !contentType ||
        !contentType.includes("text/html")
      ){
        return;
      }

      const html =
        await response.text();

      const priority =
        calculatePriority(
          url,
          baseURL
        );

      const changefreq =
        detectChangeFreq(url);

      pages.push({
        url,
        priority,
        changefreq
      });

      const parser =
        new DOMParser();

      const doc =
        parser.parseFromString(
          html,
          "text/html"
        );

      const links =
        [
          ...doc.querySelectorAll("a[href]")
        ];

      for(const link of links){

        let href =
          link.getAttribute("href");

        if(!href) continue;

        // Ignore invalid links
        if(
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("javascript:")
        ){
          continue;
        }

        try{

          const fullURL =
            normalizeURL(
              new URL(href, baseURL).href
            );

          // Same domain only
          if(
            fullURL.startsWith(baseURL)
          ){
            await crawl(fullURL);
          }

        }catch(error){
          console.log(error);
        }
      }

    }catch(error){
      console.log(error);
    }
  }

  await crawl(baseURL);

  return pages;
}

// Generate Sitemap
generateBtn.addEventListener("click", async () => {

  output.textContent = "";

  resultsBody.innerHTML = "";

  resultsTable.style.display = "none";

  pageInfo.textContent = "";

  statusText.innerHTML =
    `<span class="success">Preparing to crawl...</span>`;

  const websiteURL =
    document
      .getElementById("websiteUrl")
      .value
      .trim();
  if(websiteURL == ""){

    statusText.textContent =
      'Enter a URL first';

    return;

  } else if(!isValidURL(websiteURL)){

    statusText.textContent =
      'Incorrect URL, enter a valid Http or Https url';

    return;
  }

  const baseURL =
    normalizeURL(websiteURL);

  try{

    const pages =
      await crawlWebsite(baseURL);

    if(pages.length === 0){

      statusText.textContent =
        'Error no pages found, try again';

      return;
    }

    const today =
      new Date()
      .toISOString()
      .split("T")[0];

    sitemapXML =
`<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.hiiscript.com/tools-and-projects/sitemap-generator.html">

${pages.map(page => `
  <url>
    <loc>${escapeXML(page.url)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`).join("")}

</urlset>`;

    output.textContent =
      sitemapXML;

    // Table Results
    pages.forEach(page => {

      const row =
        document.createElement("tr");

      row.innerHTML = `
        <td>${page.url}</td>
        <td>${page.priority}</td>
      `;

      resultsBody.appendChild(row);

    });

    resultsTable.style.display =
      "table";

    pageInfo.innerHTML =
      `<span class="success">Successful pages Found: ${pages.length}</span>` ;

    statusText.innerHTML =
      `<span class="success">Sitemap generated successfully, click the Download button</span>`;

    downloadBtn.style.display =
      "block";

  }catch(error){

    console.log(error);

    statusText.textContent =
      'Failed to crawl website or incorrect URL, try again';
  }

});

// Download Sitemap
downloadBtn.addEventListener("click", () => {

  const blob =
    new Blob(
      [sitemapXML],
      { type:"application/xml" }
    );

  const fileURL =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = fileURL;

  a.download = "sitemap.xml";

  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);

  URL.revokeObjectURL(fileURL);

});