module.exports = {
  plugins: [
    require('css-declaration-sorter')({ order: 'concentric-css' }),
    require('autoprefixer')({ grid: true }),
    require('css-mqpacker'),
  ],
}
