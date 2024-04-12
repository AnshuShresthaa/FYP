import axios from "axios";

export const createPost = async ({ token, title, content, user, tags }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log(token)
    
        const postData = {
            title: title,
            content: content,
            user: user, 
            tags:tags,
            
        };
        
        const { data } = await axios.post(`/api/journal`, postData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};


export const getJournalEntry = async ({ token, id }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`/api/journal/${id}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getAllJournalEntries = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`/api/journal`, config);
        return data; // No need to map the entries here
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getUserJournalEntries = async (token,userId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token.token}`,
            },
        };
        
        const { data } = await axios.get(`/api/journal/${token.userId}`, config);

     
        
        return data;
       
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};


export const updateJournalEntry = async ({ token, id, title, content, tags }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const updateData = {
            title: title,
            content: content,
            tags: tags,
        };

        const { data } = await axios.put(`/api/journal/${id}`, updateData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const deleteJournalEntry = async ({ token, id }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`/api/journal/${id}`, config);
        return { message: "Journal entry deleted successfully" };
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};