import { createBrowserHistory } from 'history';

export function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var history = createBrowserHistory();
export default history;
// The native router Redirect div wasn't working (It changed the URL but didn't re-render)
// This is a garbage way to do things and is very un-react-like, but it works
export function redirectTo(path) {
    history.push(path);
    window.location.reload();
}

export function logout() {
    localStorage.token = undefined;
    redirectTo('/');
}