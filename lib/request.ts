'use strict'

import got, { Method, ResponseType } from 'got'

interface Params {
    uri: string,
    form: object,
    method: Method,
    responseType: ResponseType
}

const request = ({
    uri,
    form,
    method = 'POST',
    responseType = 'json'
}: Params) => {
    return got(uri, {
        form,
        method,
        responseType
    }).then(response => response.body)
}

module.exports = request
