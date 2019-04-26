'use strict';
const safeRegex = require('safe-regex');
const { parse, generate, optimize } = require('regexp-tree');

module.exports = {
  meta: {
    docs: {
      description: 'Optimize regex literals',
      category: 'Possible Improvements',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
  },

  create: (context) => {
    const sourceCode = context.getSourceCode();

    const optimizeRegexLiteral = (node) => {
      const { type, value, start } = sourceCode.getFirstToken(node);

      if (type !== 'RegularExpression') {
        return;
      }

      let parsedSource;
      try {
        parsedSource = parse(value);
      } catch (e) {
        context.report({
          node,
          message: "{{original}} can't be parsed: {{message}}",
          data: {
            original: value,
            message: e.message,
          },
        });

        return;
      }

      const originalRegex = generate(parsedSource).toString();
      const optimizedRegex = optimize(value).toString();

      if (originalRegex === optimizedRegex) {
        return;
      }

      context.report({
        node,
        message: '{{original}} should be optimized to {{optimized}}',
        data: {
          original: value,
          optimized: optimizedRegex,
        },
        fix(fixer) {
          return fixer.replaceText(node, optimizedRegex);
        },
      });
    };

    const reportUnsafeRegexLiteral = (node) => {
			// Handle regex literal inside RegExp constructor in the other handler
			if (node.parent.type === 'NewExpression' && node.parent.callee.name === 'RegExp') {
				return;
			}

			if (!safeRegex(node.value)) {
				context.report({
					node,
          message: 'Unsafe regular expression',
				});
			}
    };

    const reportUnsafeRegexExpression = (node) => {
			const args = node.arguments;

			if (args.length === 0 || args[0].type !== 'Literal') {
				return;
			}

			const hasRegExp = args[0].regex;

			let pattern = null;
			let flags = null;

			if (hasRegExp) {
				({pattern} = args[0].regex);
				flags = args[1] && args[1].type === 'Literal' ? args[1].value : args[0].regex.flags;
			} else {
				pattern = args[0].value;
				flags = args[1] && args[1].type === 'Literal' ? args[1].value : '';
			}

			if (!safeRegex(`/${pattern}/${flags}`)) {
				context.report({
					node,
          message: 'Unsafe regular expression',
				});
			}
    };

    return {
      Literal: optimizeRegexLiteral,
      'Literal[regex]': reportUnsafeRegexLiteral,
      'NewExpression[callee.name="RegExp"]': reportUnsafeRegexExpression,
    };
  },
};
