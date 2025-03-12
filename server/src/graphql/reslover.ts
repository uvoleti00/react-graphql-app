import type { Context } from '../context'
import type { Car, People } from './types'

type RetrunType<T> = T | null | undefined
export const resolvers = {
    People: {
        cars: (
            parent: People,
            _args: never,
            context: Context
        ): RetrunType<Car[]> => {
            return context.cars.filter(car => car.personId === parent.id)
        }
    },
    Query: {
        people: (
            _: never,
            _args: never,
            context: Context
        ): RetrunType<People[]> => context.people,
        cars: (_: never, _args: never, context: Context): RetrunType<Car[]> =>
            context.cars,
        personWithCars: (
            _: never,
            args: { id: string },
            context: Context
        ): RetrunType<People> => {
            return context.people.find(person => person.id === args.id)
        }
    },

    Mutation: {
        addPerson: (
            _: never,
            args: { firstName: string; lastName: string },
            context: Context
        ): RetrunType<People> => {
            const newPerson = {
                id: (context.people.length + 1).toString(),
                firstName: args.firstName,
                lastName: args.lastName
            }
            context.people.push(newPerson)
            return newPerson
        },
        updatePerson: (
            _: never,
            args: { id: string; firstName: string; lastName: string },
            context: Context
        ): RetrunType<People> => {
            const person = context.people.find(person => person.id === args.id)
            if (person) {
                if (args.firstName) person.firstName = args.firstName
                if (args.lastName) person.lastName = args.lastName
            }
            return person
        },
        deletePerson: (
            _: never,
            args: { id: string },
            context: Context
        ): RetrunType<People> => {
            const index = context.people.findIndex(
                person => person.id === args.id
            )
            if (index !== -1) {
                const [deletedPerson] = context.people.splice(index, 1)
                // Remove all their cars
                context.cars = context.cars.filter(
                    car => car.personId !== args.id
                )
                return deletedPerson
            }
            return null
        },

        addCar: (
            _: never,
            args: {
                year: string
                make: string
                model: string
                price: string
                personId: string
            },
            context: Context
        ): RetrunType<Car> => {
            const newCar = {
                id: (context.cars.length + 1).toString(),
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
            }
            context.cars.push(newCar)
            return newCar
        },
        updateCar: (
            _: never,
            args: {
                id: string
                year?: string
                make?: string
                model?: string
                price?: string
                personId?: string
            },
            context: Context
        ): RetrunType<Car> => {
            const car = context.cars.find(car => car.id === args.id)
            if (car) {
                if (args.year) car.year = args.year
                if (args.make) car.make = args.make
                if (args.model) car.model = args.model
                if (args.price) car.price = args.price
                if (args.personId) car.personId = args.personId
            }
            return car
        },
        deleteCar: (
            _: never,
            args: { id: string },
            context: Context
        ): RetrunType<Car> => {
            const index = context.cars.findIndex(car => car.id === args.id)
            if (index !== -1) {
                return context.cars.splice(index, 1)[0]
            }
            return null
        }
    }
}
