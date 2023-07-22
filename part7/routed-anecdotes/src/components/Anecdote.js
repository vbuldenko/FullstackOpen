
const Anecdote = ({ anecdote, vote }) => (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes <button onClick={() => vote(anecdote.id) }>vote</button></p>
      <p>for more info see <a href={anecdote.info} >{anecdote.info}</a></p>
    </div>
)

export default Anecdote