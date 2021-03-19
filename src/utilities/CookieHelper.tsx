import Cookies from "universal-cookie";

export const AUTH_COOKIE_NAME = "cgbAuthToken";
export const CGB_HAS_TOKEN_NAME = "cgbHasAuthToken";

export function prefersDarkMode(systemPreference: boolean): boolean {
    const cookies = new Cookies();
    const cookieValue = cookies.get('prefersDarkMode');
    return cookieValue === undefined ? systemPreference : cookieValue === "true";
}

export function getCGBAuthToken() {
    const cookies = new Cookies();
    return cookies.get(CGB_HAS_TOKEN_NAME);
}

export function removeAuthCookies() {
    const cookies = new Cookies();
    cookies.remove(AUTH_COOKIE_NAME);
    cookies.remove(CGB_HAS_TOKEN_NAME);
}