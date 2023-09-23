module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('public')
  return {
    passthroughFileCopy: true
  }
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('bmc.ico')
  return {
    passthroughFileCopy: true
  }
}