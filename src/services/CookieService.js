import { Cookies } from 'react-cookie'

const appCookies = new Cookies();

class CookieService {
    set(key, value, {...options}) {
        return appCookies.set(key, value, options)
    }

    get(key) {
        return appCookies.get(key)
    }

    remove(key) {
        appCookies.remove(key)
    }
}

export default new CookieService();
