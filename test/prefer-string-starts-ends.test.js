const rule = require('../rules/lib/prefer-string-starts-ends');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
	parserOptions: { ecmaVersion: 2018 }
});

const errors = {
	startsWith: [{
		ruleId: 'prefer-starts-ends-with',
		message: 'Prefer `String#startsWith` over a regex with `^`.'
	}],
	endsWith: [{
		ruleId: 'prefer-starts-ends-with',
		message: 'Prefer `String#endsWith` over a regex with `$`.'
	}]
};

const validRegex = [
	/foo/,
	/^foo$/,
	/^foo+/,
	/foo+$/,
	/^[f,a]/,
	/[f,a]$/,
	/^\w/,
	/\w$/,
	/^foo./,
	/foo.$/,
	/\^foo/,
	/^foo/i
];

const invalidRegex = [
	/^foo/,
	/foo$/,
	/^!/,
	/!$/,
	/^ /,
	/ $/
];

ruleTester.run('prefer-starts-ends-with', rule, {
	valid: [
		'foo.startsWith("bar")',
		'foo.endsWith("bar")',

		// Ensure it doesn't crash:
		'reject(new Error("foo"))',
		'"".test()',
		'test()',
		'test.test()',
		'startWith("bar")',
		'foo()()'
	]
		.concat(validRegex.map(re => `${re}.test(bar)`))
		.concat(validRegex.map(re => `bar.match(${re})`)),
	invalid: []
		.concat(invalidRegex.map(re => ({
			code: `${re}.test(bar)`,
			errors: errors[`${re}`.startsWith('/^') ? 'startsWith' : 'endsWith']
		})))
		.concat(invalidRegex.map(re => ({
			code: `bar.match(${re})`,
			errors: errors[`${re}`.startsWith('/^') ? 'startsWith' : 'endsWith']
		})))
});
