import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAll, update } from './requests'
import { useNotificationDispatch } from './CounterContext'

const App = () => {
  
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: 'VOTE', data: anecdote.content})
    setTimeout(() => {
      dispatch({type: 'HIDE'})
    }
    , 5000)
  }

  const result = useQuery('anecdotes', getAll,
    {
      retry: false,
      refetchOnWindowFocus: false
    })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not abailable due to problems in server</div>
  }

  const anecdotes = result.data

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
