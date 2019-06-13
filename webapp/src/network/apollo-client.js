import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'
import ApolloClient from 'apollo-client/ApolloClient'
import { InMemoryCache } from 'apollo-cache-inmemory'

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
        .then(oper => request(oper))
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
    withClientState({
      defaults: {
        isConnected: true
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache }) => {
            cache.writeData({ data: { isConnected } })
            return null
          }
        }
      },
      cache
    }),
    new HttpLink({
      uri: SERVER_URL,
      credentials: 'include'
    })
  ]),
  cache
})

window.__APOLLO_CLIENT__ = client
