import { useMutation } from '@apollo/client'
import type { MutationAddPersonArgs } from '@gqlgen/graphql'
import { ADD_PERSON, GET_PERSONS, GET_RECORDS } from '@shared/graphql-queries'
import React, { useState, type ReactNode } from 'react'



const AddPerson = (): ReactNode => {

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [addPerson, { loading }] = useMutation(ADD_PERSON, {
        onError: err => {
            console.error(err)
            setErrorMessage('Failed to Add the Person')
        }, refetchQueries: [{query: GET_PERSONS},{query:GET_RECORDS}]
    })

    const [formData, setFormData] = useState<MutationAddPersonArgs>({
        firstName: '',
        lastName: ''
    })
    const [errors, setErrors] = useState<{firstName?:string, lastName?:string}>({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const validateForm = (): boolean => {
        const newErrors: {firstName?:string, lastName?:string} = {}

        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required'
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last Name is required'
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

        await addPerson({
            variables: formData
        })

        setFormData({ firstName: '', lastName: '' });
    }


    const getInputClass = (fieldName: keyof MutationAddPersonArgs) => {
        return errors[fieldName]
            ? 'border border-red-500'
            : 'border data-[hover]:shadow data-[focus]:bg-blue-100'
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className='flex flex-col gap-5 items-center bg-white p-6 m-5 outline outline-black/5'>
            <div>
                <div className="font-bold">Add Person</div>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='flex flex-row gap-4 items-center justify-items-center'>
                    {errorMessage }
                    <div className='flex gap-1'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={getInputClass('firstName')}
                        />
                    </div>
                    <div className='flex gap-1'>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={getInputClass('lastName')}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-blue cursor-pointer outline p-1" 
                    >
                        {isSubmitting || loading ? 'Submitting...' : 'Add Person'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddPerson
