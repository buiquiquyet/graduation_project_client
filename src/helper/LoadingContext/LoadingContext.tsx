import React, { createContext, useContext, useState } from 'react';

// Tạo context
const LoadingContext = createContext({
    isLoading: false,
    setLoading: (loading: boolean) => {}
});

// Tạo provider cho context
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

// Hook để sử dụng context
export const useLoading = () => {
    return useContext(LoadingContext);
};
