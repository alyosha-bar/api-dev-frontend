// Include a library for JWT, such as jsrsasign or jwt-simple
import KJUR from 'jsrsasign';

// Function to generate JWT and store it in a cookie
export function generateAndStoreJWT(userId, secret) {

    console.log("YO creating token")

    const payload = {
        sub: userId,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // Expires in 1 hour
    };

    const header = { alg: 'HS256', typ: 'JWT' };
    const token = KJUR.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), secret);

    // Conditionally set Secure flag if on HTTPS
    const secureFlag = window.location.protocol === 'https:' ? 'Secure;' : '';  
    const sameSite = `${import.meta.env.VITE_SAMESITE}`;

    // Store JWT in a cookie without HttpOnly and conditionally with Secure
    document.cookie = `authToken=${token}; ${secureFlag} SameSite=${sameSite}; path=/; max-age=${60 * 60}`;
}
