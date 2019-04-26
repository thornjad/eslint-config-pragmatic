const rule = require('../rules/lib/optimize-regex');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 2018}
});

const unsafeError = {
	ruleId: 'no-unsafe-regex',
	message: 'Unsafe regular expression'
};

ruleTester.run('optimize-regex', rule, {
  valid: [
    'let foo = /baz/i',
    'let foo = /bar/mig',
    'let foo = /\\/\\./',
    'let foo = /[/\\\\]$/',
    'const foo = /\bunicorn\b/',
		'const foo = /\bunicorn\b/g',
		'const foo = new RegExp(\'^\bunicorn\b\')',
		'const foo = new RegExp(\'^\bunicorn\b\', \'i\')',
		'const foo = new RegExp(/\bunicorn\b/)',
		'const foo = new RegExp(/\bunicorn\b/g)',
		'const foo = new RegExp()',
  ],

  invalid: [
    {
      code: 'let re = /[a-zA-Z_0-9][A-Z_\\da-z]*\\e{1,}/',
      output: 'let re = /\\w+e+/',
      errors: [
        {
          message:
            '/[a-zA-Z_0-9][A-Z_\\da-z]*\\e{1,}/ should be optimized to /\\w+e+/',
          type: 'Literal',
        },
      ],
    },
    {
      code: 'let re = /foooooo/',
      output: 'let re = /fo{6}/',
      errors: [
        {
          message: '/foooooo/ should be optimized to /fo{6}/',
          type: 'Literal',
        },
      ],
    },
    {
			code: 'const foo = /(x+x+)+y/',
			errors: [unsafeError]
		},
		{
			code: 'const foo = /(x+x+)+y/g',
			errors: [unsafeError]
		},
		{
			code: 'const foo = new RegExp(\'(x+x+)+y\')',
			errors: [unsafeError]
		},
		{
			code: 'const foo = new RegExp(\'(x+x+)+y\', \'g\')',
			errors: [unsafeError]
		},
		{
			code: 'const foo = new RegExp(/(x+x+)+y/)',
			errors: [unsafeError]
		},
		{
			code: 'const foo = new RegExp(/(x+x+)+y/g)',
			errors: [unsafeError]
		}
  ],
});
