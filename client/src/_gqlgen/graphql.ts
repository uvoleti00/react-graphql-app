/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Car = {
  __typename?: 'Car';
  id: Scalars['String']['output'];
  make: Scalars['String']['output'];
  model: Scalars['String']['output'];
  personId: Scalars['String']['output'];
  price: Scalars['String']['output'];
  year: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCar?: Maybe<Car>;
  addPerson?: Maybe<People>;
  deleteCar?: Maybe<Car>;
  deletePerson?: Maybe<People>;
  updateCar?: Maybe<Car>;
  updatePerson?: Maybe<People>;
};


export type MutationAddCarArgs = {
  make: Scalars['String']['input'];
  model: Scalars['String']['input'];
  personId: Scalars['String']['input'];
  price: Scalars['String']['input'];
  year: Scalars['String']['input'];
};


export type MutationAddPersonArgs = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};


export type MutationDeleteCarArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePersonArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCarArgs = {
  id: Scalars['String']['input'];
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  personId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePersonArgs = {
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
};

export type People = {
  __typename?: 'People';
  cars?: Maybe<Array<Maybe<Car>>>;
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  cars?: Maybe<Array<Maybe<Car>>>;
  people?: Maybe<Array<Maybe<People>>>;
  personWithCars?: Maybe<People>;
};


export type QueryPersonWithCarsArgs = {
  id: Scalars['String']['input'];
};
