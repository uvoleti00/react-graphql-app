import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { type Context } from './context'
import { resolvers, carsTypeDef, peopleTypeDef } from './graphql'

const server = new ApolloServer<Context>({
    typeDefs: [carsTypeDef, peopleTypeDef],
    resolvers
})

const inMemoryStore = {
    people: [],
    cars: []
}

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000

const { url } = await startStandaloneServer(server, {
    listen: { port },
    context: (): Context => {
        return {
            people: inMemoryStore.people,
            cars: inMemoryStore.cars
        }
    }
})

console.log(`🚀  Server ready at: ${url}`)
