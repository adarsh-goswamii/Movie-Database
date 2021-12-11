import { configureStore } from '@reduxjs/toolkit';
import { slice } from './ToggleSlice';

const store= configureStore({
    reducer: {
        Toggle: slice.reducer
    }
}); 

export default store;