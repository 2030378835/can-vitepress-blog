import "./chunk-WOOG5QLI.js";

// node_modules/.pnpm/@codemirror+legacy-modes@6.4.2/node_modules/@codemirror/legacy-modes/mode/diff.js
var TOKEN_NAMES = {
  "+": "inserted",
  "-": "deleted",
  "@": "meta"
};
var diff = {
  name: "diff",
  token: function(stream) {
    var tw_pos = stream.string.search(/[\t ]+?$/);
    if (!stream.sol() || tw_pos === 0) {
      stream.skipToEnd();
      return ("error " + (TOKEN_NAMES[stream.string.charAt(0)] || "")).replace(/ $/, "");
    }
    var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();
    if (tw_pos === -1) {
      stream.skipToEnd();
    } else {
      stream.pos = tw_pos;
    }
    return token_name;
  }
};
export {
  diff
};
//# sourceMappingURL=diff-BR4QR4HG.js.map
