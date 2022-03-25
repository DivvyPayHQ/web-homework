import { css } from '@emotion/react'

export const editTransactionStyle = css`
        width: 35%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;

    .editTransactionHeader{
        color: #487ECE;
        text-transform: uppercase;
        font-size: 1.2rem;
        margin-right: 35%;
        margin-top: 2%;
    }

    .editTransactionForm {
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

    .editTransactionInput {
        background-color: #dedfe0;
        height: 3vh;
        margin-bottom: 1rem;
        font-weight: bold;
    }

    label {
        text-transform: uppercase;
        font-size: .8rem;
    }
    
    .editTransactionRadio {
        position: relative;
        right: 7.9rem;
        bottom: 1.2rem;
    }

    button {
        width: 15%;
        height: 4vh;
        border-radius: 2rem;
        background-color: black;
        color: white;
        text-transform: uppercase;
        font-size: .6rem;
        font-weight: bold;
    }
`
