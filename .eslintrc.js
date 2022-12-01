module.exports = {
    parser: '@typescript-eslint/parser',
  
    parserOptions: {
      sourceType: 'module',
    },
  
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
  
    env: {
      node: true,
      es2020: true,
    },

    
  }