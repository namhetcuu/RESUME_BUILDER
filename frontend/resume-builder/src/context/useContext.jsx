import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user) return;
        
        const accessToken = localStorage.getItem("token");
        if(!accessToken){
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                clearUser();
            } finally{
                setLoading(false);
            }
        }
        fetchUser();
    },[])

    //🔄 Cập nhật user khi login/signup
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        setLoading(false);
    }

    //🚫 Xóa user khi logout hoặc hết hạn token
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    }

    //🌐 Cung cấp giá trị cho các component con
    return (
        <UserContext.Provider value={{user, loading, updateUser, clearUser}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;