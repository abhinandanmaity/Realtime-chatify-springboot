// import Cookies from 'js-cookie';
import jsCookie from 'js-cookie';
import CryptoJS from 'crypto-js';
// var CryptoJS = require("crypto-js");

const SECRET_KEY = 'your-secure-key'; // Use a strong, secure key (keep it secret!)

// Encrypt user details
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt user details
export const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

// Storing user details securely in a cookie
export const storeUserDetails = (user) => {
    const encryptedData = encryptData(user);
    jsCookie.set('Host-chatify.csrf-token', encryptedData, {
        secure: false, // Use true only in production with HTTPS
        sameSite: 'lax', // 'strict' or 'lax'
        expires: 25, // Set an expiration date (in 25 days)
    });
    // console.log('Encrypted user data stored in cookie:', encryptedData);
};

// Retrieving and decrypting user details from a cookie
export const getUserDetails = () => {
    const encryptedData = jsCookie.get('Host-chatify.csrf-token');
    if (encryptedData) {
        const decryptedData = decryptData(encryptedData);
        // console.log('Decrypted user data:', decryptedData);
        return decryptedData;
    }
    return null;
};


// Storing user details securely in a cookie
export const storeToken = (token) => {
    const encryptedData = encryptData(token);
    // jsCookie.set('__Secure-chatify.session-token', encryptedData, { secure: true, sameSite: 'strict' });
    jsCookie.set('Secure-chatify.session-token', encryptedData, {
        secure: false, // Use true only in production with HTTPS
        sameSite: 'lax', // 'strict' or 'lax'
        expires: 25, // Set an expiration date (in 25 days)
    });
    // console.log('Encrypted user data stored in cookie : ', encryptedData);
};

// Retrieving and decrypting user details from a cookie
export const getToken = () => {
    const encryptedData = jsCookie.get('Secure-chatify.session-token');
    if (encryptedData) {
        const decryptedData = decryptData(encryptedData);
        // console.log('Decrypted user data:', decryptedData);
        return decryptedData;
    }
    return null;
};

export const clearAllCookies = () => {
    const allCookies = jsCookie.get(); // Get all cookies
    for (let cookieName in allCookies) {
        jsCookie.remove(cookieName); // Remove each cookie
    }
    console.log('All cookies cleared!');
};