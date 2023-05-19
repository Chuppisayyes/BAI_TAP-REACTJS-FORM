import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userList: [
        { id: '001', name: 'Nguyễn Văn A', phone: '0909199312', email: 'ngva@gmail.com', diaChi: 'Tp Hồ Chí Minh' },
        { id: '002', name: 'Nguyễn Văn B', phone: '0909199313', email: 'ngvb@gmail.com', diaChi: 'Tp Hồ Chí Minh' },
        { id: '003', name: 'Nguyễn Văn C', phone: '0909199314', email: 'ngvc@gmail.com', diaChi: 'Tp Hồ Chí Minh' },
        { id: '004', name: 'Nguyễn Văn D', phone: '0909199315', email: 'ngvd@gmail.com', diaChi: 'Tp Hồ Chí Minh' },
    ],
    editUser: {},
    isDisabled: false
};

const formReducer = createSlice({
    name: 'formReducer',
    initialState,
    reducers: {
        addUser: (state, { payload }) => {
            state.userList.push(payload);
        },
        removeUser: (state, { payload }) => {
            let index = state.userList.findIndex(user => user.id === payload);
            if (index !== -1) {
                state.userList.splice(index, 1);
            }
        },
        updateUser: (state, { payload }) => {
            let index = state.userList.findIndex(user => user.id === payload.id);
            if (index !== -1) {
                state.userList[index] = payload;
            }
        },
        setEditUser: (state, { payload }) => {
            let user = state.userList.find(user => user.id === payload);
            if (user) {
                state.editUser = user;
            } else {
                state.editUser = {};
            }
        },
        setIsDisabled: (state, { payload }) => {
            state.isDisabled = payload;
        }
    }
});

export const {
    addUser,
    removeUser,
    updateUser,
    setEditUser,
    setIsDisabled
} = formReducer.actions;

export default formReducer.reducer;