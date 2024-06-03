
export default class LocalStorageManager {
    constructor(namespace = 'ramen-go') {
        this.namespace = namespace;
    }

    setItem(key, value) {
        localStorage.setItem(`${this.namespace} -${key} `, JSON.stringify(value));
    }

    getItem(key) {
        const data = localStorage.getItem(`${this.namespace} -${key} `);
        try {
            return JSON.parse(data);
        } catch (error) {
            return null;
        }
    }

    removeItem(key) {
        localStorage.removeItem(`${this.namespace} -${key} `);
    }

    clear() {
        const keys = Object.keys(localStorage).filter(key => key.startsWith(this.namespace + '-'));
        keys.forEach(key => localStorage.removeItem(key));
    }

}
