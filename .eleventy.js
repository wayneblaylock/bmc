module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('public')
  eleventyConfig.addPassthroughCopy('bmc.ico')
  return {
    passthroughFileCopy: true
  }
}