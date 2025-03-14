import { ApolloProvider } from '@apollo/client'
import { StrictMode } from 'react'
import { apolloClient } from '../shared'
import { createRoot } from 'react-dom/client'
import AddPerson from 'src/widget/person/add-person'
import './index.css'
import AddCar from 'src/widget/car/add-car'
import Records from 'src/widget/records/records'

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
        <AddPerson/>
        <AddCar/>
        <Records/>
    </ApolloProvider>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(
    <StrictMode>
        <App />
    </StrictMode>
)