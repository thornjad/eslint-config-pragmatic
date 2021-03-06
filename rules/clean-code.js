module.exports = {
	'accessor-pairs': 'error',
	'array-bracket-spacing': [ 'error', 'always', {
		arraysInArrays: false,
		objectsInArrays: false
	}],
	'arrow-parens': [ 'error', 'as-needed', { 'requireForBlockBody': true }],
	'block-spacing': 'error',
	'brace-style': [ 'error', '1tbs' ],
	'camelcase': [ 'error', { 'properties': 'always' }],
	'comma-dangle': [ 'error', 'only-multiline' ],
	'comma-spacing': [ 'error', {
		'before': false,
		'after': true,
	}],
	'comma-style': [ 'error', 'last' ],
	'curly': [ 'error', 'all' ],
	'default-case': 'error',
	'eol-last': 'error',
	'func-call-spacing': 'error',
	'function-paren-newline': [ 'error', 'multiline' ],
	'implicit-arrow-linebreak': 'error',
	'indent': [ 'error', 'tab' ],
	'keyword-spacing': [ 'error', {
		'before': true,
		'after': true,
	}],
	'linebreak-style': [ 'error', 'unix' ],
	'max-len': [ 'error', {
		'code': 80,
		'tabWidth': 2,
		'comments': 80,
		'ignoreStrings': true,
		'ignoreTemplateLiterals': true,
		'ignoreRegExpLiterals': true,
	}],
	'max-lines-per-function': [ 'error', {
		'max': 50,
		'skipComments': true,
		'IIFEs': true,
	}],
	'max-lines': [ 'error', 300 ],
	'max-statements': [ 'error', 10, { 'ignoreTopLevelFunctions': false }],
	'max-statements-per-line': [ 'error', { 'max': 1 }],
	'no-alert': 'warn',
	'no-iife/no-iife': 'error',
	'no-lonely-if': 'error',
	'no-loops': require('./lib/no-loop'),
	'no-nested-ternary': 'error',
	'no-tabs': 'off',
	'no-trailing-spaces': 'error',
	'object-curly-spacing': [ 'error', 'always', {
		'arraysInObjects': false,
		'objectsInObjects': false,
	}],
	'padded-blocks': [ 'error', 'never' ],
	'prefer-const': 'error',
	'prefer-includes': require('./lib/prefer-includes'),
	'prefer-named-capture-group': 'warn',
	'prefer-queryselector': require('./lib/prefer-queryselector'),
	'prefer-string-starts-ends': require('./lib/prefer-string-starts-ends'),
	'quotes': [ 'error', 'single', { allowTemplateLiterals: true }],
	'semi': [ 'error', 'always' ],
	'semi-style': [ 'error', 'last' ],
	'symbol-description': 'error',
};
