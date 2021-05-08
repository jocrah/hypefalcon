'use strict'

const got = require('got')

const request = ({
    uri,
    body,
    form,
    json,
    query = {},
    headers,
    method = 'POST',
    responseType = 'json'
}) =>
    got(uri, {
        json,
        form,
        body,
        searchParams: query,
        method,
        headers,
        responseType
    }).then(response => response.body)

module.exports = request
