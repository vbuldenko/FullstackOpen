import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createHandler = async (e) => {
        e.preventDefault()
        const anecdote = { content: e.target.newAnecdote.value, votes: 0 } // aded object after modification of the reducer action
        e.target.newAnecdote.value = ''
        const newAnecdote = await anecdoteService.create(anecdote)
        console.log(newAnecdote)
        dispatch(createAnecdote(newAnecdote))

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