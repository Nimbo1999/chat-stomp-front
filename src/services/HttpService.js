import { API_CONSTANTS } from '../constants/api.constants';

class HttpService {
    constructor() {
        this.baseUrl = API_CONSTANTS.BASE_URL;
    }

    async post(data, endPoint) {
        const response = await fetch(this.baseUrl + endPoint,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: this.postHeaders(),
            }
        ).then(this.checkResponse)
        .catch(err => {
            throw err;
        });

        return response;
    }

    async get(endPoint) {
        const response = await fetch(this.baseUrl + endPoint,
            {
                method: 'GET',
                headers: this.getHeaders(),
            }
        ).then(this.checkResponse)
        .catch(err => {
            throw err;
        });

        return response;
    }

    checkResponse(response) {
        if (response.status === 500) throw new Error('Internal Server Error');

        if (response.headers.get('Content-Type') === 'application/json') return response.json();

        return response.text();
    }

    postHeaders() {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return headers;
    }

    getHeaders() {
        const headers = new Headers();

        return headers;
    }

}

export default HttpService;
