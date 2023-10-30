import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};
const contactsSlice = createSlice({
  name: 'contacts',

  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        handlePending(state);
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(addContact.pending, state => {
        handlePending(state);
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      })
      .addCase(deleteContact.pending, state => {
        handlePending(state);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        handleRejected(state, payload);
      });
  },
  // {
  //   [fetchContacts.pending]: handlePending,
  //   [fetchContacts.fulfilled](state, { payload }) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items = payload;
  //   },
  //   [fetchContacts.rejected]: handleRejected,

  //   [addContact.pending]: handlePending,
  //   [addContact.fulfilled](state, { payload }) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items.push(payload);
  //   },
  //   [addContact.rejected]: handleRejected,

  //   [deleteContact.pending]: handlePending,
  //   [deleteContact.fulfilled](state, { payload }) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.items.findIndex(contact => contact.id === payload.id);
  //     state.items.splice(index, 1);
  //   },
  //   [deleteContact.rejected]: handleRejected,
  // },
  reducers: {
    setFilter(state, { payload }) {
      state.filter = payload;
    },
  },
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
