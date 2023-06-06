const mongoose = require('mongoose');

const url = `mongodb+srv://vbfullstack:Transcend29@clustervb0.db8puja.mongodb.net/testBlogList?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length === 3) {

    Blog.find({}).then(result => {
        console.log(result)
        mongoose.connection.close()
    })

} else {
    const blog = new Blog(
        {
            "title": "Awesome text",
            "author": "Some James",
            "url": "https://wwww.google.com",
            "likes": 5
        }
    )

    blog.save().then(() => {
        console.log(`added a blog post`)
        mongoose.connection.close()
    })
}