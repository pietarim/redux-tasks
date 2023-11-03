import { createSlice } from '@reduxjs/toolkit'

import anecdoteServices from '../services/anecdotes'

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes)
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const anecdoteAfterVote = state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
      const sortedAnecdotes = sortAnecdotes(anecdoteAfterVote)
      return sortedAnecdotes
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdote = () => {
  return async dispatch => {
    const newAnecdotes = await anecdoteServices.getAll()
    const sortInitAnecdotes = sortAnecdotes(newAnecdotes)
    dispatch(setAnecdotes(sortInitAnecdotes))
  }
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const handleAnecdoteVote = anecdote => {
  return async dispatch => {
    const anecdoteToVote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id
  }
  await anecdoteServices.vote(anecdoteToVote)
  dispatch(vote(anecdoteToVote))
  }
}
 
export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer