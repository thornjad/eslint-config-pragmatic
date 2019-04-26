const rule = require('../rules/lib/no-loop');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 2018}
});
ruleTester.run('no-loops', rule, {
  valid: [
    {
      code: '[1, 2, 3].map(function (i) { console.log(i); });'
    }
  ],

  invalid: [
    {
      code: 'for (let i; i <= n; i++) { console.log(i); }',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'for (i in [1, 2, 3]) { console.log(i); }',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'while (i <= n) { console.log(i); }',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'do { console.log(i); } while (i <= n)',
      errors: [ { message: 'loops are not allowed' } ]
    },
    {
      code: 'for (i of [1, 2, 3]) { console.log(i) }',
      errors: [ { message: 'loops are not allowed' } ]
    }
  ]
});
