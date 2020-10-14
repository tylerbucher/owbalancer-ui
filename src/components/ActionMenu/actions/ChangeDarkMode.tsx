import Cookies from "universal-cookie";

function changeDarkMode(callBack: any) {
    const cookies = new Cookies();
    const cookieValue = cookies.get('prefersDarkMode');
    const newVal = cookieValue === undefined ? "true" : cookieValue === "true" ? "false" : "true";
    cookies.set('prefersDarkMode', newVal, {
        path: '/',
        maxAge: 2147483647,
        sameSite: "strict"
    });
    callBack(newVal === "true");
}

export default changeDarkMode;