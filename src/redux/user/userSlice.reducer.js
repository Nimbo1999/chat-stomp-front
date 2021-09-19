import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
	token: '',
	name: ''
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (_, action) => action.payload,
	},
});

export const { setUser } = userSlice.actions;

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
