import {
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  HttpLink,
  from} from '@apollo/client'
import {onError} from '@apollo/client/link/error'



const errorLink = onError(({graphQLErrors, networkError}) =>{
  if(graphQLErrors){
    graphQLErrors.map(({message, location, path})=>{
        alert(`Graph ql error ${message}`);
    })

  }
})
const SERVER_URL = from([
  errorLink,
  new HttpLink({uri:'http://localhost:5000/graphql'})
])

const client = new ApolloProvider({
  cache: new InMemoryCache(),
  link: SERVER_URL
});







// const request = async operation => {
//   let headers = {}
//   operation.setContext({ headers })
// }

// const cache = new InMemoryCache()

// const requestLink = new ApolloLink(
//   (operation, forward) =>
//     new Observable(observer => {
//       let handle
//       Promise.resolve(operation)
//         .then(oper => request(oper))
//         .then(() => {
//           handle = forward(operation).subscribe({
//             next: observer.next.bind(observer),
//             error: observer.error.bind(observer),
//             complete: observer.complete.bind(observer)
//           })
//         })
//         .catch(observer.error.bind(observer))

//       return () => {
//         if (handle) handle.unsubscribe()
//       }
//     })
// )

// export const client = new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors) {
//         console.warn('GQL Errors', graphQLErrors)
//       }
//       if (networkError) {
//         console.error('Network Error', networkError)
//       }
//     }),
//     requestLink,
//     withClientState({
//       defaults: {
//         isConnected: true
//       },
//       resolvers: {
//         Mutation: {
//           updateNetworkStatus: (_, { isConnected }, { cache }) => {
//             cache.writeData({ data: { isConnected } })
//             return null
//           }
//         }
//       },
//       cache
//     }),
//     new HttpLink({
//       uri: SERVER_URL,
//       credentials: 'include'
//     })
//   ]),
//   cache
// })

// window.__APOLLO_CLIENT__ = client
