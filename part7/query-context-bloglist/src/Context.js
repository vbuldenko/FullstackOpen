import { createContext, useReducer, useContext } from 'react';
import storageService from './services/storage';
import { loginIn } from './requests';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            const user = loginIn(action.payload);
            storageService.saveUser(user);
            return user;
        case 'REMOVE_USER':
            storageService.removeUser();
            return null;
        default:
            return state;
    }
};

const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    );
    const [user, dispatchUser] = useReducer(userReducer, null);

    const setNotification = (payload) => {
        notificationDispatch({ type: 'SET', payload });
        setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000);
    };

    const combinedReducer = {
        notification: [notification, setNotification],
        user: [user, dispatchUser],
    };

    return (
        <Context.Provider value={combinedReducer}>{children}</Context.Provider>
    );
};

export const useNotificationValue = () => {
    const { notification } = useContext(Context);
    return notification[0];
};

export const useSetNotification = () => {
    const { notification } = useContext(Context);
    return notification[1];
};

export const useUserValue = () => {
    const { user } = useContext(Context);
    return user[0];
};

export const useSetUser = () => {
    const { user } = useContext(Context);
    const dispatch = user[1];
    return (payload) => {
        dispatch({ type: 'SET_USER', payload });
    };
};
export const useRemoveUser = () => {
    const { user } = useContext(Context);
    const dispatch = user[1];
    dispatch({ type: 'REMOVE_USER' });
};

// export const useNotify = () => {
//     const context = useContext(Context);
//     const dispatch = context[1];
//     return (payload) => {
//         dispatch({ type: 'SET', payload });
//         setTimeout(() => {
//             dispatch({ type: 'CLEAR' });
//         }, 5000);
//     };
// };

export default Context;
