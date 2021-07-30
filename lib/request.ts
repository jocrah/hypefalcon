import got, { Method, ResponseType, Response } from 'got'

interface Params {
    uri: string,
    form: object,
    method?: Method,
    responseType?: ResponseType
}

type Member = {
    name: string,
    id: string
}

type ResponseBody = {
    members: Member[]
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
    }).json<ResponseBody>()
}

export default request
