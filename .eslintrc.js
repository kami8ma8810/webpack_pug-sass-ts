module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2019,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  // plugins: [
  //   'prettier'
  // ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'semi': false,
        'tabWidth': 2,
        'printWidth': 800,
      }
    ],
    // 'no-console': process.env.MODE === 'production' ? 'error' : 'off'
    // 'no-console': process.env.MODE === 'off'
  }
}