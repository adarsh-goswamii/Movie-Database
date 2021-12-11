import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "Toggle",
    initialState: {
        popular: "InTheatre",
        latestTrailer: "InTheatre",
        trending: "Today",
    },

    reducers: {
        popularToggle(state) {
            state.popular = state.popular === "InTheatre" ? "OnTV" : "InTheatre";
        },
        trailerToggle(state) {
            state.latestTrailer = state.latestTrailer === "InTheatre" ? "Trending" : "InTheatre";
        },
        trendingToggle(state) {
            state.trending = state.trending === "Today" ? "This Week": "Today";
        }
    }
});

const actions = slice.actions;
export default actions;