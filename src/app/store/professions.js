import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import { isOutdated } from "../utils/isOutdated";

const professionsSlice = createSlice({
    name: "profession",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

    }
});

const {
    reducer: professionsReducer,
    actions
} = professionsSlice;

const {
    professionsRequested,
    professionsReceived,
    professionsRequestFailed
} = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());

        try {
            const { content } = await professionService.get();
            dispatch(professionsReceived(content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};
//
// export const getProfessions = () => (state) => state.professions.entities;
// export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;
// export const getQualitiesByIds = (qualitiesIds) => (state) => {
//     if (state.professions.entities) {
//         const qualitiesArray = [];
//         for (const qualId of qualitiesIds) {
//             for (const quality of state.qualities.entities) {
//                 if (quality._id === qualId) {
//                     qualitiesArray.push(quality);
//                     break;
//                 }
//             }
//         }
//         return qualitiesArray;
//     }
//     return [];
//
// };

export default professionsReducer;