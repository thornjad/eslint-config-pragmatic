'use strict';

module.exports = (context) => {
  const reportLoopPresence = (node) => {
    context.report(node, 'loops are not allowed', { identifier: node.name });
  };

  return {
    ForStatement: reportLoopPresence,
    ForInStatement: reportLoopPresence,
    WhileStatement: reportLoopPresence,
    DoWhileStatement: reportLoopPresence,
    ForOfStatement: reportLoopPresence
  };
};
