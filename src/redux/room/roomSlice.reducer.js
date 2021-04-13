import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
	token: null,
	user: null,
};

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		setRoom: (_, action) => action.payload,
	},
});

export const { setRoom } = roomSlice.actions;

export const selectRoom = state => state.room;

export const selectRoomToken = createSelector(
	[selectRoom],
	room => room.token
);

export const selectRoomUser = createSelector(
	[selectRoom],
	room => room.user
);

export default roomSlice.reducer;
