import ReactDOM from 'react-dom/client'
import AppRouter from './routes'
import { ApolloProvider } from '@apollo/client'
import { client } from './network/apollo-client'

ReactDOM.createRoot(
  document.getElementById('app')
).render(
  <div data-app-init=''>
    <ApolloProvider client={client}>
      <AppRouter />
    </ApolloProvider>
  </div>
)
