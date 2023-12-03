// Todo: Add constants for magic numbers.
// Todo: Check sanitize library 
import bcrypt from 'bcryptjs';

const BASE_URL = 'http://172.18.0.3:5000';

const ENDPOINTS = {
    USER: '/user',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    QUESTIONS: '/questions',
};

// Function to handle API requests
const request = async (method, endpoint, body = null) => {
    //Input Validation
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

    if (!validMethods.includes(method)) {
        throw new Error('Invalid request method');
    }
    if (typeof endpoint !== 'string' || endpoint.trim() === '') {
        throw new Error('Endpoint must be a valid string');
    }
    if (body !== null && typeof body !== 'object') {
        throw new Error('Body must be an object or null');
    }
    if (!method || !endpoint) {
        throw new Error('Invalid method or endpoint');
    }

    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
    };

    // Include the body in the request options if it's provided
    if (body !== null) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
        const data = await response.json();
        
        //Response Validation
        if (!response.ok) {
            console.error(`Request failed with status ${response.status}: ${data.message}`);
            throw new Error(data.message || 'An error occurred during the request.');
        }
        //  
        if (typeof data !== 'object' || data === null) {
            throw new Error('Response from server is not in expected format');
        }
        return data;
    } catch (error) {
         //Error Handling
         console.error(`An error occurred during the request: ${error.message}`);
         throw new Error(`Request to ${method} ${endpoint} failed: ${error.message}`);
    }
};

const validateNumber = (value, name, { min = -Infinity, max = Infinity, allowNull = false } = {}) => {
    if ((allowNull && value === null) || (typeof value === 'number' && value >= min && value <= max && !isNaN(value))) {
        return;
    }
    throw new Error(`Invalid ${name}. ${name} must be a number between ${min} and ${max}.`);
};

function validateString(input, fieldName) {
    if (typeof input !== 'string' || input.trim() === '') {
        throw new Error(`${fieldName} must be provided and cannot be empty.`);
    }
}


export const getUserData = async (user_id) => {
    // Sanity Check: Validate user_id
    validateNumber(user_id, 'user ID', { min: 1 });

    const endpoint = ENDPOINTS.USER;
    const reqBody = {
        "user_id": user_id
    }

    try {
        // Make the request
        return await request('GET', endpoint, reqBody); //Todo: check if i get user data
    } catch (error) {
        // Error Handling: Log and re-throw or handle the error as needed
        console.error(`Error fetching user data: ${error.message}`);
    }
};


export const updateUserProgress = async (user_id, level_index, score, total_score, hp) => {
    // Using validateNumber for input validation
    validateNumber(user_id, 'user ID', { min: 1 }); //Todo check if ther user id is not object id
    validateNumber(level_index, 'level index', { min: 0 });
    validateNumber(score, 'score', { min: 0 });
    validateNumber(total_score, 'total score', { min: 0 });
    validateNumber(hp, 'HP', { min: 0 });

    const newProgress = {
        "user_id": user_id,
        "new_level_index": level_index,
        "new_level_highscores": score,
        "new_total_score": total_score,
        "new_hp": hp
    }

    try {
        const endpoint = ENDPOINTS.USER;
        return await request('POST', endpoint, newProgress);
    } catch (error) {
        console.error(`Error updating user progress: ${error.message}`);
        throw new Error(`Could not update progress for user ID ${user_id}`);
    }
};


export const handleLogin = async (username, password) => {
    // Validate the inputs
    validateString(username, 'Username');
    validateString(password, 'Password');

    const endpoint = ENDPOINTS.LOGIN;
    try {
        // Hash the password before sending it to the server
        const hashedPassword = bcrypt.hashSync(password, 10);
        return await request('POST', endpoint, { username, hashedPassword });
    } catch (error) {
        // Handle errors without exposing sensitive details
        console.error(`Error during login: ${error}`);
        throw new Error('An error occurred during login.');
    }
};


export const handleLogout = async (token) => {
    // Validate the token
    validateString(token, 'Token');

    // Construct the endpoint for logout
    const endpoint = ENDPOINTS.LOGOUT;

    // Call the request function with a POST method, endpoint, and token
    // Assuming your API requires a token to be sent for logging out
    return await request('POST', endpoint, {token});
};

export const handleRegister = async (username, password) => {
    validateString(username,'User name')
    validateString(password,'Password')
    const endpoint = ENDPOINTS.REGISTER;
    return await request('POST', endpoint, {username, password});
};

export const getLevel = async (level_index) => {
    validateNumber(level_index,'Level index', {min : 0})
    
    const endpoint = ENDPOINTS.QUESTIONS;
    const body = {
        "level_index": level_index
    }
    return await request('GET', endpoint, body);
};

export const addQuestionsToDB = async (question_array) => {
    // Validate the question array
    if (!Array.isArray(question_array) || question_array.length === 0) {
        throw new Error('Invalid input: questions must be a non-empty array.');
    }
    question_array.forEach(validateQuestion);

    const endpoint = ENDPOINTS.QUESTIONS;
    const body = {
        "questions": question_array
    }
    return await request('POST', endpoint, body);
};

export const setHP = async (user_id, new_hp) => {
    //Validiate
    validateString(user_id, 'User ID');

    const endpoint = ENDPOINTS.USER;
    const body = {
        "user_id": user_id,
        "new_hp": new_hp
    }
    return await request('POST', endpoint, body);
};

