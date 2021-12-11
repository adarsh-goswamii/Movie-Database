import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "Toggle",
    initialState: {
        popular: "InTheatre",
        latestTrailer: "InTheatre",
        trending: "today",
    },

    reducers: {
        popularToggle(state) {
            state.popular = state.popular === "InTheatre" ? "OnTV" : "InTheatre";
        },
        trailerToggle(state) {
            state.latestTrailer = state.latestTrailer === "InTheatre" ? "OnTV" : "InTheatre";
        },
        trendingToggle(state) {
            state.trending = state.trending === "Today" ? "Today" : "This Week";
        }
    }
});

const actions = slice.actions;
export default actions;