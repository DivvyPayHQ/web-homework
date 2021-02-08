module.exports = {
  'passPerPreset': false,
  'presets': [
    [
      '@babel/preset-env',
      {
        'targets': '> 0.25%, maintained node versions, not dead'
      }
    ],
    '@babel/preset-react',
    '@emotion/babel-preset-css-prop'
  ],
  'plugins': [
    '@babel/plugin-transform-template-literals',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-transform-runtime',
    // Stage 0
    '@babel/plugin-proposal-function-bind',

    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
    ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
    '@babel/plugin-proposal-do-expressions',

    // Stage 2
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',

    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { 'loose': false }],
    '@babel/plugin-proposal-json-strings',
    'emotion'
  ],
  'env': {
    'test': {
      'plugins': ['transform-require-context']
    }
  }
}
