import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import audioPlayerReducer from '../features/Audio/AudioPlayerSlice';

export const store = configureStore({
  reducer: {
    audioPlayer: audioPlayerReducer,
  },
});
