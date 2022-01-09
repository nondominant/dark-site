const axios = require("axios");
const Web3 = require("web3");
const { parse } = require("node-html-parser");
const { uint256ToNum, numToUint256 } = require("../util/helpers");
const base721 = "https://etherscan.io/tokens-nft";
const base1155 = "https://etherscan.io/tokens-nft1155";
const RECORDS = 100;
const PAGE = 1;

(async () => {
  const tokens = [];
  for (const page in Array.from(Array(PAGE).keys())) {
    console.log("page", page);
    const res = await axios.get(base721 + `?ps=${RECORDS}&p=${page}`);
    const root = parse(res.data);
    const items = root.querySelectorAll("div.token-wrap > a");
    for (const token of items) {
      const data = {};
      data.name = token.innerText;
      data.contract = unescape(token.getAttribute("title"));
      // Ignore all NFT contracts that don't have a name
      if (data.contract !== "undefined") {
        tokens.push(data);
      }
    }
    console.log(tokens);
    console.log(`got ${tokens.length} tokens`);
  }
})();
