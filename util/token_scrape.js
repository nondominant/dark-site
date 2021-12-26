const axios = require("axios");
const { parse } = require("node-html-parser");

const base721 = "https://etherscan.io/tokens-nft";
const base1155 = "https://etherscan.io/tokens-nft1155";
const RECORDS = 100;
const PAGE = 1;

(async () => {
  const res = await axios.get(base721 + `?ps=${RECORDS}&p=${PAGE}`);
  const root = parse(res.data);
  const items = root.querySelectorAll("div.token-wrap > a");
  const tokens = [];
  for (const token of items) {
    const data = {};
    data.name = token.innerText;
    data.contract = unescape(token.getAttribute("title"));
    tokens.push(data);
  }
  console.log(tokens);
})();
