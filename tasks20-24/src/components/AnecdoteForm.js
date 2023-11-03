import { createNew } from '../requests'
import { useNotificationDispatch } from '../CounterContext'
import { useQueryClient, useMutation } from 'react-query'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: (error) => {
      dispatch({type: 'SHORT'})
      setTimeout(() => {
        dispatch({type: 'HIDE'})
      }
      , 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    dispatch({type: 'CREATE', data: content})
    setTimeout(() => {
      dispatch({type: 'HIDE'})
    }
    , 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
