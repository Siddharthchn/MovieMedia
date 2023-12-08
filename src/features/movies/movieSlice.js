import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieApi from '../../common/apis/MovieApi';
import {APIKey} from '../../common/apis/MovieApiKey';

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
 
    const response = await MovieApi.get(`?apikey=${APIKey}&s=${term}&type=movie`)
    return response.data
})

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
 
    const response = await MovieApi.get(`?apikey=${APIKey}&s=${term}&type=series`)
    return response.data
})

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchMovieOrShowDetail', async (id) => {
    const response = await MovieApi.get(`?apikey=${APIKey}&i=${id}&Plot=full`)
    return response.data
})

const initialState= {
    movies: {},
    shows: {},
    selectMovieOrShow: {}
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    // extraReducers: {
    //     [fetchAsyncMovies.pending]: () => {
    //         console.log("Pending");
    //     },
    //     [fetchAsyncMovies.fulfilled]: (state,{payload}) => {
    //         console.log("Fetched Successfully");
    //         return {...state, movies: payload}
    //     },
    //     [fetchAsyncMovies.rejected]: () => {
    //         console.log("Rejected");
    //     },         old version  
    // }
      extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, () => {
                console.log("Pending");
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, {payload}) => {
                console.log("Fetched Successfully");
                return {...state, movies: payload};
            })
            .addCase(fetchAsyncMovies.rejected, () => {
                console.log("Rejected");
            })
            .addCase(fetchAsyncShows.fulfilled, (state, {payload}) => {
                console.log("Fetched Successfully");
                return {...state, shows: payload};
            })
            .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, {payload}) => {
                console.log("Fetched Successfully");
                return {...state, selectMovieOrShow: payload};
            })
    },
});

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;