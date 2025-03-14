import gql from 'graphql-tag'

export const GET_RECORDS = gql`
    query People {
        people {
            id
            firstName
            lastName
            cars {
                make
                model
                id
                personId
                price
                year
            }
        }
    }
`

export const ADD_PERSON = gql`
    mutation AddPerson($firstName: String!, $lastName: String!) {
        addPerson(firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`

export const GET_PERSONS = gql`
    query People {
        people {
            id
            firstName
            lastName
        }
    }
`

export const ADD_CAR = gql`
    mutation AddCar(
        $year: String!
        $make: String!
        $model: String!
        $price: String!
        $personId: String!
    ) {
        addCar(
            year: $year
            make: $make
            model: $model
            price: $price
            personId: $personId
        ) {
            id
            make
            model
            personId
            price
            year
        }
    }
`
export const UPDATE_CAR = gql`
    mutation UpdateCar(
        $updateCarId: String!
        $year: String
        $make: String
        $model: String
        $price: String
        $personId: String
    ) {
        updateCar(
            id: $updateCarId
            year: $year
            make: $make
            model: $model
            price: $price
            personId: $personId
        ) {
            id
            year
            make
            model
            price
            personId
        }
    }
`

export const UPDATE_PERSON = gql`
    mutation UpdatePerson(
        $updatePersonId: String!
        $firstName: String
        $lastName: String
    ) {
        updatePerson(
            id: $updatePersonId
            firstName: $firstName
            lastName: $lastName
        ) {
            firstName
            lastName
            id
        }
    }
`

export const DELETE_PERSON = gql`
    mutation DeletePerson($deletePersonId: String!) {
        deletePerson(id: $deletePersonId) {
            id
        }
    }
`

export const DELETE_CAR = gql`
    mutation DeleteCar($deleteCarId: String!) {
        deleteCar(id: $deleteCarId) {
            id
            make
            model
        }
    }
`
