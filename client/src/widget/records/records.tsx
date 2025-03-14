import { useMutation, useQuery } from '@apollo/client'
import type { People, Car, Maybe } from '@gqlgen/graphql'
import {
    DELETE_CAR,
    DELETE_PERSON,
    GET_PERSONS,
    GET_RECORDS,
    UPDATE_CAR,
    UPDATE_PERSON
} from '@shared/graphql-queries'
import { useState, type ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const Records = (): ReactNode => {
    const { data, loading, error } = useQuery(GET_RECORDS)
    const { data:personsData } = useQuery(GET_PERSONS)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [selectedPerson, setSelectedPerson] = useState<People | null>(null)
    const [selectedCar, setSelectedCar] = useState<Car | null>(null)

    const [deletePerson] = useMutation(DELETE_PERSON, {
        onError: err => {
            console.error(err)
            setErrorMessage('Failed to Delete the Person')
        },
        refetchQueries: [{ query: GET_RECORDS }]
    })

    const [deleteCar] = useMutation(DELETE_CAR, {
        onError: err => {
            console.error(err)
            setErrorMessage('Failed to Delete the Car')
        },
        refetchQueries: [{ query: GET_RECORDS }]
    })

    const handleDeletePerson = (id: string) => {
        deletePerson({ variables: { deletePersonId: id } })
    }

    const handleDeleteCar = (id: string) => {
        deleteCar({ variables: { deleteCarId: id } })
    }

    const [updatePerson] = useMutation(UPDATE_PERSON, {
        onError: err => {
            console.error(err)
            setErrorMessage('Failed to Update the Person')
        },
        refetchQueries: [{ query: GET_RECORDS }]
    })

    const [updateCar] = useMutation(UPDATE_CAR, {
        onError: err => {
            console.error(err)
            setErrorMessage('Failed to Update the Car')
        },
        refetchQueries: [{ query: GET_RECORDS }]
    })

    const handlePersonEdit = (person: People) => {
        setSelectedPerson(person)
    }

    const handleCarEdit = (car: Car) => {
        setSelectedCar(car)
    }

    const handlePersonUpdate = async (updatedPerson: {
        firstName: string
        lastName: string
    }) => {
        if (selectedPerson) {
            await updatePerson({
                variables: { updatePersonId: selectedPerson.id, ...updatedPerson }
            })
            setSelectedPerson(null) 
        }
    }

    const handleCarUpdate = async (updatedCar: {
        make: string
        model: string
        year: string
        price: string
        personId: string
    }) => {
        if (selectedCar) {
            await updateCar({
                variables: { updateCarId: selectedCar.id, ...updatedCar }
            })
            setSelectedCar(null) 
        }
    }

    return (
        <>
            <div className="flex flex-col gap-1 items-center bg-white m-5 p-2 outline outline-black/5">
                {errorMessage && <div>{errorMessage}</div>}
                {loading && <div>Loading...</div>}
                {error && <div>Error Loading Records...</div>}
                {!loading &&
                    !error &&
                    data &&
                    data?.people.map((person: People) => {
                        return (
                            <div
                                key={person.id}
                                className="flex flex-col gap-5 w-full bg-white m-5 outline outline-black/5"
                            >
                                <div className="">
                                    <div className="p-2 outline outline-black/5 bg-gray-50">{`${person.firstName} ${person.lastName}`}</div>
                                    {person.cars && person.cars.length > 0 ? (
                                        <div>
                                            {person.cars
                                                .filter(
                                                    (car: Maybe<Car>) =>
                                                        car !== null
                                                )
                                                .map((car: Car) => (
                                                    <div
                                                        key={car.id}
                                                        className="flex flex-col gap-5 m-5 bg-white outline outline-black/5 "
                                                    >
                                                        <div className="p-2 outline outline-black/5">{`${car.year} ${car.make} ${car.model} -> $ ${car.price}`}</div>
                                                        <div className="flex justify-evenly items-center outline outline-black/5">
                                                            <button
                                                                className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                                                                onClick={() =>
                                                                    handleCarEdit(
                                                                        car
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faEdit
                                                                    }
                                                                    size="sm"
                                                                    style={{
                                                                        color: 'blue'
                                                                    }}
                                                                />
                                                            </button>
                                                            <button
                                                                className="p-2 hover:bg-gray-200 rounded ml-4 cursor-pointer"
                                                                onClick={() =>
                                                                    handleDeleteCar(
                                                                        car.id
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrashCan
                                                                    }
                                                                    size="sm"
                                                                    style={{
                                                                        color: 'red'
                                                                    }}
                                                                />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <div className='m-2'>No Cars Available</div>
                                    )}
                                </div>
                                <div className="flex justify-evenly items-center outline outline-black/5">
                                    <button
                                        className="p-2 hover:bg-gray-200 rounded cursor-pointer"
                                        onClick={() => handlePersonEdit(person)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            size="sm"
                                            style={{ color: 'blue' }}
                                        />
                                    </button>
                                    <button
                                        className="p-2 hover:bg-gray-200 rounded ml-4 cursor-pointer"
                                        onClick={() =>
                                            handleDeletePerson(person.id)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            size="sm"
                                            style={{ color: 'red' }}
                                        />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
            </div>

            
            {selectedPerson && (
                <Modal
                    onClose={() => setSelectedPerson(null)}
                    title="Edit Person"
                    data={selectedPerson}
                    onSubmit={handlePersonUpdate}
                    persons={personsData}
                />
            )}

           
            {selectedCar && (
                <Modal
                    onClose={() => setSelectedCar(null)}
                    title="Edit Car"
                    data={selectedCar}
                    onSubmit={handleCarUpdate}
                    persons={personsData}
                />
            )}
        </>
    )
}

const Modal = ({
    onClose,
    title,
    data,
    onSubmit,
    persons
}: {
    onClose: () => void
    title: string
    data: People | Car
    onSubmit: (updatedData: any) => void
    persons: any
}) => {
    const isPerson = (data: People | Car): data is People => {
        return (data as People).firstName !== undefined
    }
    let [isOpen, setIsOpen] = useState(true)
    const [firstName, setFirstName] = useState(
        isPerson(data) ? data.firstName : ''
    )
    const [lastName, setLastName] = useState(
        isPerson(data) ? data.lastName : ''
    )
    const [make, setMake] = useState(isPerson(data) ? '' : data.make)
    const [model, setModel] = useState(isPerson(data) ? '' : data.model)
    const [year, setYear] = useState(isPerson(data) ? '' : data.year)
    const [price, setPrice] = useState(isPerson(data) ? '' : data.price)
    const [personId, setPersonId] = useState(isPerson(data) ? '' : data.personId)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isPerson(data)) {
            onSubmit({ firstName, lastName })
        } else {
            onSubmit({ make, model, year, price, personId })
        }
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-full space-y-4 border bg-white p-12">
                    <DialogTitle className="font-bold text-center">
                        {title}
                    </DialogTitle>

                    <form onSubmit={handleSubmit}>
                        {isPerson(data) ? (
                            <>
                                <div className="flex flex-row gap-4 items-center justify-items-center">
                                    <div className="flex gap-1">
                                        <label htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={firstName}
                                            onChange={e =>
                                                setFirstName(e.target.value)
                                            }
                                            className="border data-[hover]:shadow data-[focus]:bg-blue-100"
                                        />
                                    </div>
                                    <div className="flex gap-1">
                                        <label htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={lastName}
                                            onChange={e =>
                                                setLastName(e.target.value)
                                            }
                                            className="border data-[hover]:shadow data-[focus]:bg-blue-100"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                            <div className="flex flex-row gap-4 items-center justify-items-center">
                                <div className="flex gap-2">
                                    <label htmlFor="year">Year</label>
                                    <input
                                        type="text"
                                        id="year"
                                        name="year"
                                        value={year}
                                        onChange={e => setYear(e.target.value)}
                                        className="border data-[hover]:shadow data-[focus]:bg-blue-100"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label htmlFor="make">Make</label>
                                    <input
                                        type="text"
                                        id="make"
                                        name="make"
                                        value={make}
                                        onChange={e => setMake(e.target.value)}
                                        className="border data-[hover]:shadow data-[focus]:bg-blue-100"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label htmlFor="model">Model</label>
                                    <input
                                        type="text"
                                        id="model"
                                        name="model"
                                        value={model}
                                        onChange={e => setModel(e.target.value)}
                                        className="border data-[hover]:shadow data-[focus]:bg-blue-100"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                       className="border data-[hover]:shadow data-[focus]:bg-blue-100"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <label htmlFor="person">Person</label>
                                    <select
                                        name="personId"
                                        id="personId"
                                        onChange={e => setPersonId(e.target.value)}
                                        value={personId}
                                       className="border data-[hover]:shadow data-[focus]:bg-blue-100"
                                    >
                                        <option value="" disabled>
                                            Select a person
                                        </option>
                                        {persons.people.map((people: People) => (
                                            <option
                                                key={people.id}
                                                value={people.id}
                                            >
                                                {people.firstName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                </div>
                            </>
                        )}
                        <div className="flex flex-row gap-2 mt-5 items-center justify-items-center">
                            <button
                                type="submit"
                                className="border p-2 cursor-pointer"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="border p-2 cursor-pointer"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    )
}

export default Records
