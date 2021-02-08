export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `Naive DateTime` scalar type represents a naive date and time without
   * timezone. The DateTime appears in a JSON response as an ISO8601 formatted
   * string.
   */
  NaiveDateTime: any;
}

/** Input parameters for a new merchant */
export interface CreateMerchantInput {
  readonly description: Scalars['String'];
  readonly name: Scalars['String'];
}

/** Input parameters for a new transaction */
export interface CreateTransactionInput {
  /** amount is in cents */
  readonly amount: Scalars['Int'];
  readonly credit: Scalars['Boolean'];
  readonly debit: Scalars['Boolean'];
  readonly description: Scalars['String'];
  readonly merchantId: Scalars['ID'];
  readonly userId: Scalars['ID'];
}

/** Input parameters for a new user */
export interface CreateUserInput {
  readonly dob: Scalars['String'];
  readonly firstName: Scalars['String'];
  readonly lastName: Scalars['String'];
}

export interface Merchant {
  readonly __typename?: 'Merchant';
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['NaiveDateTime']>;
}

export interface RootMutationType {
  readonly __typename?: 'RootMutationType';
  /** Create a new merchant */
  readonly createMerchant?: Maybe<Merchant>;
  /** Create a new transaction */
  readonly createTransaction?: Maybe<Transaction>;
  /** Create a new user */
  readonly createUser?: Maybe<User>;
  /** Delete an existing merchant */
  readonly deleteMerchant?: Maybe<Merchant>;
  /** delete an existing transaction */
  readonly deleteTransaction?: Maybe<Transaction>;
  /** Delete an existing user */
  readonly deleteUser?: Maybe<User>;
  /** Update a given merchant */
  readonly updateMerchant?: Maybe<Merchant>;
  /** Update a given transaction */
  readonly updateTransaction?: Maybe<Transaction>;
  /** Update a given user */
  readonly updateUser?: Maybe<User>;
}


export interface RootMutationTypeCreateMerchantArgs {
  input: CreateMerchantInput;
}


export interface RootMutationTypeCreateTransactionArgs {
  input: CreateTransactionInput;
}


export interface RootMutationTypeCreateUserArgs {
  input: CreateUserInput;
}


export interface RootMutationTypeDeleteMerchantArgs {
  id: Scalars['ID'];
}


export interface RootMutationTypeDeleteTransactionArgs {
  id: Scalars['ID'];
}


export interface RootMutationTypeDeleteUserArgs {
  id: Scalars['ID'];
}


export interface RootMutationTypeUpdateMerchantArgs {
  input: UpdateMerchantInput;
}


export interface RootMutationTypeUpdateTransactionArgs {
  input: UpdateTransactionInput;
}


export interface RootMutationTypeUpdateUserArgs {
  input: UpdateUserInput;
}


export interface RootQueryType {
  readonly __typename?: 'RootQueryType';
  /** Get all Merchants */
  readonly merchants?: Maybe<ReadonlyArray<Maybe<Merchant>>>;
  /** Get all Transactions */
  readonly transactions?: Maybe<ReadonlyArray<Maybe<Transaction>>>;
  /** Get all Users */
  readonly users?: Maybe<ReadonlyArray<Maybe<User>>>;
}

export interface Transaction {
  readonly __typename?: 'Transaction';
  readonly amount?: Maybe<Scalars['Int']>;
  readonly credit?: Maybe<Scalars['Boolean']>;
  readonly debit?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  readonly merchant?: Maybe<Merchant>;
  readonly merchantId?: Maybe<Scalars['ID']>;
  readonly updatedAt?: Maybe<Scalars['NaiveDateTime']>;
  readonly user?: Maybe<User>;
  readonly userId?: Maybe<Scalars['ID']>;
}

/** Input parameters for a merchant */
export interface UpdateMerchantInput {
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly name?: Maybe<Scalars['String']>;
}

/** Input parameters to update a transaction */
export interface UpdateTransactionInput {
  /** amount is in cents */
  readonly amount?: Maybe<Scalars['Int']>;
  readonly credit?: Maybe<Scalars['Boolean']>;
  readonly debit?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly merchantId: Scalars['ID'];
  readonly userId: Scalars['ID'];
}

/** Input parameters to update a user */
export interface UpdateUserInput {
  readonly dob?: Maybe<Scalars['String']>;
  readonly firstName?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly lastName?: Maybe<Scalars['String']>;
}

export interface User {
  readonly __typename?: 'User';
  readonly dob?: Maybe<Scalars['String']>;
  readonly firstName?: Maybe<Scalars['String']>;
  readonly id: Scalars['ID'];
  readonly insertedAt?: Maybe<Scalars['NaiveDateTime']>;
  readonly lastName?: Maybe<Scalars['String']>;
  readonly updatedAt?: Maybe<Scalars['NaiveDateTime']>;
}
