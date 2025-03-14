import { useMutation, useQuery } from '@apollo/client'
import type { MutationAddCarArgs, People } from '@gqlgen/graphql'
import { ADD_CAR, GET_PERSONS, GET_RECORDS } from '@shared/graphql-queries'
import React, { useState, type ReactNode } from 'react'





type FormErrorType = {
    make?: string
    model?: string
    personId?: string
    price?: string
    year?: string
}

const AddCar = (): ReactNode => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { data } = useQuery(GET_PERSONS)

    const [addCar, { loading }] = useMutation(ADD_CAR, {
        onError: err => {
            console.error(err)
            setErrorMessage('Failed to Add the Car')
        },
        refetchQueries: [{query: GET_RECORDS}]
    })

    const [formData, setFormData] = useState<MutationAddCarArgs>({
        make: '',
        model: '',
        personId: '',
        price: '',
        year: ''
    })
    const [errors, setErrors] = useState<FormErrorType>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: FormErrorType = {}
        if (!formData.make) {
            newErrors.make = 'Make Name is required'
        }

        if (!formData.model) {
            newErrors.model = 'Model Name is required'
        }

        if (!formData.year) {
            newErrors.year = 'Year is required'
        }

        if (!formData.price) {
            newErrors.price = 'Price is required'
        }

        if (!formData.personId) {
            newErrors.personId = 'Person is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0 
    }

    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

       
        if (!validateForm()) {
            setIsSubmitting(false)
            return
        }
        setErrorMessage(null)
        setIsSubmitting(false)

        await addCar({
            variables: formData
        })

        setFormData({ make: '', model: '', personId: '', year: '', price: '' })
    }

    const getInputClass = (fieldName: keyof MutationAddCarArgs) => {
        return errors[fieldName]
            ? 'border border-red-500'
            : 'border data-[hover]:shadow data-[focus]:bg-blue-100'
    }

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className='flex flex-col gap-5 items-center  bg-white p-6 m-5 outline outline-black/5'>
            <div>
                <h1 className="font-bold">Add Car</h1>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='flex no-wrap gap-4'>
                    {errorMessage}
                    <div className='flex gap-2'>
                        <label htmlFor="year">Year</label>
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className={getInputClass('year')}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="make">Make</label>
                        <input
                            type="text"
                            id="make"
                            name="make"
                            value={formData.make}
                            onChange={handleChange}
                            className={getInputClass('make')}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="model">Model</label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className={getInputClass('model')}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className={getInputClass('price')}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="person">Person</label>
                        <select
                            name="personId"
                            id="person"
                            onChange={handleChange}
                            value={formData.personId}
                            className={getInputClass('personId')}
                        >
                            <option value="" disabled>
                                Select a person
                            </option>
                            {data?.people.map(
                                (people: People) => (
                                    <option key={people.id} value={people.id}>
                                        {people.firstName}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-blue cursor-pointer outline p-1"
                    >
                        {isSubmitting || loading ? 'Submitting...' : 'Add Car'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCar
