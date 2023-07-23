import { useField } from '../hooks'

const CreateNew = ( {addNew}) => {
    const [ content, resetContent ] = useField('text')
    const [ author, resetAuthor ] = useField('text')
    const [ info, resetInfo ] = useField('url')
  
  
    const handleSubmit = (e) => {
      e.preventDefault()
      addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
    }

    const handleReset = () => {
      resetContent()
      resetAuthor()
      resetInfo()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input name='content' { ...content } />
          </div>
          <div>
            author
            <input name='author' { ...author } />
          </div>
          <div>
            url for more info
            <input name='info' { ...info } />
          </div>
          <button type='submit' >create</button>
          <button type='button' onClick={handleReset}>reset</button>
        </form>
      </div>
    )
  
}

export default CreateNew