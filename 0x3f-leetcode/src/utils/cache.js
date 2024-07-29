import { GM_getValue, GM_setValue, GM_deleteValue } from '$'



class Cache {
    set(k, v) {
        // window.localStorage.setItem(k, JSON.stringify(v))
        GM_setValue(k, v)
    }
    get(k, parse = true, name = String.name) {

        try {
            //let o = window.localStorage.getItem(k)
            let v = GM_getValue(k)
            switch (name) {
                case String.name:
                    if (v == null) {
                        return 'null'
                    }
                    return v
                case Object.name:
                    if (v == null || v == undefined || typeof (v) != 'object') {
                        return {}
                    }
                    return v
                case Boolean.name:
                    if (v === null || v == undefined) {
                        return false
                    }
                    if (v == false || v == 'false' || v == '' || v == 'null') {
                        return false
                    }
                    return v
                case Array.name:
                    if (v === null || v == undefined || !Array.isArray(v)) {
                        return []
                    }
                    return v
                default:
                    return v
            }
        } catch (E) {
            return null
        }
    }
    remove(k) {
        // window.localStorage.removeItem(k)
        GM_deleteValue(k)
    }

}


export default new Cache()