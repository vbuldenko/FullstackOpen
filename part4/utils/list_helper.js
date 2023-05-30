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

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favoriteBlog = blogs.reduce((prevBlog, currentBlog) => currentBlog.likes > prevBlog.likes ? currentBlog : prevBlog);

  return favoriteBlog

}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  return blogs.reduce((prevBlog, currentBlog) => currentBlog.blogs > prevBlog.blogs ? currentBlog: prevBlog).author
}

  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}