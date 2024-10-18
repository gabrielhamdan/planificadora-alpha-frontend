import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${auth?.token}`;
                
                return config;
            }, (err) => Promise.reject(err)
        );

        const reponseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            
            // TODO: lógica para refresh do token
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(reponseIntercept);
        }
    }, [auth]);

    return axiosPrivate;
};

export default useAxiosPrivate;