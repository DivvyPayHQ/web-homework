module.exports = {
  presets: [
      '@babel/preset-env',
  ['@babel/preset-react', {
      runtime: 'automatic',
      importSource: '@emotion/react'
    }]
  ],
  plugins: [
    '@emotion',
    'react-hot-loader/babel'
  ]
}
