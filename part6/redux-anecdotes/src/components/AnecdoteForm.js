import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createHandler = (e) => {
        e.preventDefault()
        const anecdote = { content: e.target.newAnecdote.value, votes: 0, id: 1231242134124 } // aded object after modification of the reducer action
        e.target.newAnecdote.value = ''
        dispatch(createAnecdote(anecdote))

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createHandler}>
                <div><input name='newAnecdote' /></div>
                <button type="submit" >create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm