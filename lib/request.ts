import got, { Method, ResponseType } from 'got'

type Params = {
    uri: string,
    form: object,
    method?: Method,
    responseType?: ResponseType
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
    }).json()
}

export default request
