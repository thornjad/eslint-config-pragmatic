module.exports = {
  'no-restricted-properties': [
    'error',
    {
      object: 'Math',
      property: 'pow',
      message: 'Use the exponentiation operator (**) instead of Math.pow()',
    },
  ],
  'no-var': 'error',
  'object-shorthand': 'error',
  'prefer-arrow-callback': 'error',
  'prefer-template': 'error',
  'prefer-spread': 'error',
  'prefer-rest-params': 'error',
  'prefer-object-spread': 'error',
};
