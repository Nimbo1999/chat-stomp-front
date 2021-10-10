import { API_CONSTANTS } from '../constants/api.constants';

import InternalServerError from '../exceptions/InternalServerError';
import BadRequestError from '../exceptions/BadRequestError';
import handleHttpRequestErrors from '../exceptions/HandleHttpRequestErrors';
import HTTP_RESPONSE_CODE from '../constants/HttpResponseCode';

class HttpService {
    constructor() {
        this.baseUrl = API_CONSTANTS.BASE_URL;
    }

    async post(data, endPoint) {
        const response = await fetch(this.baseUrl + endPoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this.postHeaders()
        })
            .then(this.checkResponse)
            .catch(err => {
                handleHttpRequestErrors(err);
                throw err;
            });

        return response;
    }

    async get(endPoint) {
        const response = await fetch(this.baseUrl + endPoint, {
            method: 'GET',
            headers: this.getHeaders()
        })
            .then(this.checkResponse)
            .catch(err => {
                handleHttpRequestErrors(err);
                throw err;
            });

        return response;
    }

    checkResponse(response) {
        HttpService.validateResponseStatus(response);

        if (response.headers.get('Content-Type') === 'application/json') return response.json();

        return response.text();
    }

    static validateResponseStatus(response) {
        if (!response) return;

        switch (response.status) {
            case HTTP_RESPONSE_CODE.BAD_REQUEST:
                throw new BadRequestError(
                    'Não foi possível acessar esse recurso, tente novamente mais tarde. Bad Request'
                );

            case HTTP_RESPONSE_CODE.INTERNAL_SERVER_ERROR:
                throw new InternalServerError(
                    'Não foi possível acessar esse recurso, tente novamente mais tarde. Internal Server Error'
                );

            default:
                return;
        }
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
