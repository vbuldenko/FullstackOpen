import { useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createHandler = async (e) => {
        e.preventDefault()
        const anecdote = { content: e.target.newAnecdote.value, votes: 0 } // added object after modification of the reducer action
        e.target.newAnecdote.value = ''
        dispatch(addNewAnecdote(anecdote))
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
