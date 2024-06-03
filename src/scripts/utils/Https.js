export default class Https {
    constructor() {}

    async buildUrl(route) {
        const BASE_URL = process.env.API_URL;
        return `${BASE_URL}/${route}`;
    }

    async buildOptions(method, params) {
        const API_KEY = process.env.API_KEY;
        const options = {
            method,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'x-api-key': `${API_KEY}`
            },
        };

        if (['PUT', 'POST'].includes(method)) {
            options.body = JSON.stringify(params);
            options.headers = { 
                ...options.headers,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
        }
        return options;
    }

    async makeRequest(url, method, params = {}) {
        const options = await this.buildOptions(method, params);
        try {
            const response = await fetch(url, options);
            return await this.handleResponse(response);
        } catch (error) {
            console.error(`API Error (${method}): ${error}`);
        }
    }

    async handleResponse(response) {
        if (response.ok) {
            return await response.json();
        } else {
            const body = await response.json();
            throw new Error(body.user_message || 'API request failed');
        }
    }

    async get(route) {
        return await this.makeRequest(await this.buildUrl(route), 'GET');
    }

    async delete(route) {
        return await this.makeRequest(await this.buildUrl(route), 'DELETE');
    }

    async put(route, params) {
        return await this.makeRequest(await this.buildUrl(route), 'PUT', params);
    }

    async post(route, params) {
        return await this.makeRequest(await this.buildUrl(route), 'POST', params);
    }

}