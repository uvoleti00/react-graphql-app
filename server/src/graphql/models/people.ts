import { gql } from 'graphql-tag'

export const peopleTypeDef = gql`
    type People {
        id: String!
        firstName: String!
        lastName: String!
        cars: [Car]
    }

    type Query {
        people: [People]
        personWithCars(id: String!): People
    }

    type Mutation {
        addPerson(firstName: String!, lastName: String!): People
        updatePerson(id: String!, firstName: String, lastName: String): People
        deletePerson(id: String!): People
    }
`
