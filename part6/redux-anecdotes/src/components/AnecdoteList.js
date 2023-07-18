import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { handleNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => filter === ''? anecdotes:
    anecdotes.filter( anecdote => anecdote.content.includes(filter)))

  const dispatch = useDispatch()

  const voteHandler = (anecdote) => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    dispatch(voteForAnecdote(anecdote.id, changedAnecdote))
    dispatch(handleNotification(`you voted for "${anecdote.content}"`, 5000 ))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
