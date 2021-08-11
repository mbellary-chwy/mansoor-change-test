
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: '3.4'
      }
    ],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-nullish-coalescing-operator',
    '@babel/proposal-optional-chaining',
    '@babel/plugin-transform-runtime'
  ]
};
