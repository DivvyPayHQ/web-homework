import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, Observable } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const SERVER_URL = 'http://localhost:8000/graphql'


const request = async operation => {
  let headers = {}
  operation.setContext({ headers })
}

const cache = new InMemoryCache()

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle
      Promise.resolve(operation)
        .then(operation => request(operation))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

export const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.warn('GQL Errors', graphQLErrors)
      }
      if (networkError) {
        console.error('Network Error', networkError)
      }
    }),
    requestLink,
    new HttpLink({
      uri: SERVER_URL
    })
  ]),
  cache
})

window.__APOLLO_CLIENT__ = client
