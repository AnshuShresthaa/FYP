import axios from "axios";

export const createMoodEntry = async ({ token, mood, note }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const moodData = {
            mood: mood,
            note: note,
            date: new Date().toISOString(),
        };

        const { data } = await axios.post(`/api/mood`, moodData, config);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllMoodEntries = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`/api/mood`, config);
        return data.map(entry => ({ ...entry, date: new Date(entry.date) }));
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserMoodEntries = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token.token}`,
            },
        };
        
        // Make a request to the backend to get mood entries only for the authenticated user
        const { data } = await axios.get(`/api/mood/${token.userId}`, config);
       console.log(data)
        return data.map(entry => ({ ...entry, date: new Date(entry.date) }));
    } catch (error) {
        throw new Error(error.message);
    }
};


export const getMoodEntry = async ({ token, id }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.get(`/api/mood/${id}`, config);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateMoodEntry = async ({ token, id, mood, note }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const updateData = {
            mood: mood,
            note: note,
        };

        const { data } = await axios.put(`/api/mood/${id}`, updateData, config);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteMoodEntry = async ({ token, id }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.delete(`/api/mood/${id}`, config);
        return { message: "Mood entry deleted successfully" };
    } catch (error) {
        throw new Error(error.message);
    }
};
