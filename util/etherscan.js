const axios = require("axios");
const fs = require("fs");
const APIKEY = "ZYCPMJ3CQZMESWQ2T9MWQJ7BT2JY47R21D";
const decoder = require('ethereum-input-data-decoder-without-fs');

(async () => {
  const baseURL = "https://www.cyberkongz.com/api/metadata";
  const CONTRACT_ADDR = "0x57a204AA1042f6E66DD7730813f4024114d74f37";
  const tokenData = await axios.get(
    `https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${CONTRACT_ADDR}&apikey=${APIKEY}`
  );
  console.log(tokenData.data)
  const AMOUNT = tokenData?.data?.result || null;
  console.log(`Total tokens: ${AMOUNT}`);
  //const ws = fs.createWriteStream('.')
  for (let i = 0; i <= Number(AMOUNT); i++) {
    const res = await axios.get(`${baseURL}/${i}`);
    const data = res.data;
    console.log(res.data);
    await sleep(1000);
  }
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
