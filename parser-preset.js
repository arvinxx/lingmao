module.exports = {
  parserOpts: { // gitmoji commit 提取表达式 for commitlint
    headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
    headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
  },
};
