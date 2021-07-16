import http from 'components/http'

const baseUrl = '/repositories'

const find = async ({ language = 'javascript' } = {}) => {
  try {
    const params = { q: `language:${language}` }
    const response = await http.get(baseUrl, { params })
    const { items } = response.data
    return Promise.resolve(items)
  } catch (e) {
    return Promise.reject(e)
  }
}

export default {
  find
}
