import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createNew = content =>
  axios.post(baseUrl, { content, votes: 0 }).then(res => res.data)

export const update = (newObject) =>
  axios.put(`${baseUrl}/${newObject.id}`, newObject).then(res => res.data)