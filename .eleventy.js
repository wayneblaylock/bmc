module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('public')
  return {
    passthroughFileCopy: true
  }
}