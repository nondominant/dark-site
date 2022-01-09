module.exports.uint256ToNum = function (hex) {
  const len = hex.length;
  return parseInt(hex.substring(len - 3, len), 16);
};

module.exports.numToUint256 = function (num) {
  const BASE =
    "0xc87b56dd000000000000000000000000000000000000000000000000000000000000"; // Base unint256 hex with last 16bits removed.
  const TOTAL = 4;
  const n = num.toString(16);
  let extra = "";
  for (let i = 0; i < TOTAL - n.length; i++) {
    extra += "0";
  }
  return BASE + extra + n;
};
