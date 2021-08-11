module.exports = {
  plugins: {
    autoprefixer: {
      grid: 'autoplace'
    },
    cssnano: {
      preset: [
        'default',
        {
          discardComments: { removeAll: true },
          minifyFontValues: { removeQuotes: true }
        }
      ]
    }
  }
};
