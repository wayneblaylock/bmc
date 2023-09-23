module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('public')
  return {
    passthroughFileCopy: true
  }
  eleventyConfig.addPassthroughCopy('bmc.ico')
  return {
    passthroughFileCopy: true
  }
}