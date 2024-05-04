import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quotes: [],
    q2: [],
    todaysQuote: {},
};

const quoteSlice = createSlice({
    initialState,
    name: "quotes",
    reducers: {
        setQuotes: (state, action) => {
            if (state.quotes.length === 0) {
                state.quotes = action.payload;
                state.q2 = action.payload;
            } else {
                state.quotes = [...state.quotes, ...action.payload];
                state.q2 = state.quotes;
            }
        },
        resetQuotes: (state, action) => {
            return initialState;
        },
        setTodaysQuote: (state, action) => {
            state.todaysQuote = action.payload;
        },
        filterByAuthorName: (state, action) => {
            if (action.payload === "" || state.quotes.length === 0) {
                state.quotes = state.q2;
            } else {
                state.quotes = state.quotes.filter((quote) =>
                    quote.author
                        .toLowerCase()
                        .includes(action.payload.toLowerCase())
                );
            }
        },
    },
});

export const { filterByAuthorName, setQuotes, resetQuotes, setTodaysQuote } =
    quoteSlice.actions;

export default quoteSlice;
