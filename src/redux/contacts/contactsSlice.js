import { createSlice } from '@reduxjs/toolkit';
import contacts from '../../mock/contacts.mock';

const initialState = contacts;

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts: (_, action) => action.payload,
  },
});

export const { setContacts } = contactsSlice.actions;

export const selectContacts = state => state.contacts;

export default contactsSlice.reducer;
