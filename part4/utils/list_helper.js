const dummy = (blogs) => {
    if (Array.isArray(blogs)) {
      return 1;
    } else {
        return 1;
      }
}

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((acc, blogObject) => acc + blogObject.likes, 0);
  return totalLikes;
}

const favoriteBlog = (blogs) {

  const favoriteBlogIndex = blogs.reduce((acc, currentBlog, currentBlogIndex) => currentBlog.likes > acc ? currentBlog.likes : acc )

  return blogs[favoriteBlogIndex]

}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}