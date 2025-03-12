import { gql } from 'graphql-tag'

export const carsTypeDef = gql`
    type Car {
        id: String!
        year: String!
        make: String!
        model: String!
        price: String!
        personId: String!
    }

    type Query {
        cars: [Car]
    }

    type Mutation {
        addCar(
            year: String!
            make: String!
            model: String!
            price: String!
            personId: String!
        ): Car
        updateCar(
            id: String!
            year: String
            make: String
            model: String
            price: String
            personId: String
        ): Car
        deleteCar(id: String!): Car
    }
`
