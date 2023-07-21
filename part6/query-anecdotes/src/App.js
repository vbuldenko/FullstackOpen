import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import Context from './ContextState'

const App = () => {
  const context = useContext(Context)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation( updateAnecdote, {
    // onSuccess: (updatedAnecdote) => {
    //   const anecdotes = queryClient.getQueryData('anecdotes')
    //   queryClient.setQueryData('anecdotes', anecdotes.map( anecdote => anecdote.id === updatedAnecdote.id? updatedAnecdote: anecdote ))
    // }
    onSuccess: () => {
        queryClient.invalidateQueries('anecdotes')
    }
  })
  
  //additional requests forbidden when first was unsuccessful - { retry: false }
  const { isLoading, isError, error, data } = useQuery( 'anecdotes',  getAnecdotes, { retry: false })

  if ( isLoading ) {
    return <div>loading data...</div>
  }
  if ( isError ) {
    return <div>
      <b>Service is unavailable due to server error</b>
      <p>Error: { error.message }</p>
    </div>
  }

  const anecdotes = data
  
  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdoteMutation.mutate(updatedAnecdote)
    context[2](`anecdote '${anecdote.content}' voted`)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
