import type { BaseContext } from '@apollo/server'
import type { Car, People } from './graphql'

export interface Context extends BaseContext {
    people: People[]
    cars: Car[]
}
