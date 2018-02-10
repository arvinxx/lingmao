module.exports = {
  parserOpts: {
    headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
    headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
  },
};
