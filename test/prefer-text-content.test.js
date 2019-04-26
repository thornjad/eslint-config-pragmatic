const rule = require('../rules/lib/prefer-text-content');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 2018}
});

const error = {
	ruleId: 'prefer-text-content',
	message: 'Prefer `textContent` over `innerText`.'
};

ruleTester.run('prefer-text-content', rule, {
	valid: [
		'innerText;',
		'node.textContent;',
		'node[innerText];',
		'innerText = true;',
		'node[\'innerText\'];'
	],
	invalid: [
		{
			code: 'node.innerText;',
			output: 'node.textContent;',
			errors: [error]
		},
		{
			code: 'node.innerText = \'foo\';',
			output: 'node.textContent = \'foo\';',
			errors: [error]
		}
	]
});
