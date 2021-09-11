import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
	token: '',
	name: '',
	status: ''
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setName: (_, action) => action.payload,
	},
});

export const { setName } = userSlice.actions;

export const selectUser = state => state.user;

export const selectUserName = createSelector(
	[selectUser],
	user => user.name
);

export const selectUserToken = createSelector(
	[selectUser],
	user => user.token
);

export default userSlice.reducer;
