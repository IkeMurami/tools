import xmldom from "xmldom"
import { beautify_css, beautify_html, beautify_js } from "../../utils/beautifiers"


export type Data = {
    data: string | null
    body: string | null
}

export type Item = {
    url: string
    host: string
    ip: string
    method: string
    path: string
    status: string
    mimetype: string
    extension: string | null
    request: Data
    response: Data
    // js_sourcemap?: string
}

export const getItems = async (file: File): Promise<HTMLCollectionOf<Element>> => {
    const data = await file.text()
    let doc: Document
    try {
        doc = new xmldom.DOMParser({errorHandler: {
            fatalError(msg) {
                console.log('XML Parser error', msg)
            },
        }}).parseFromString(data, 'application/xml')
        const items = doc.getElementsByTagName('item')
        return new Promise((resolve) => {
            resolve(items)
        })
    } catch(err) {
        return Promise.reject('Invalid input XML')
    }
}

const parseRequestOrResponse = (elem: Element, extension: string | null): Data => {
    const DELIMETER = '\r\n\r\n'
    const isBase64 = elem.getAttribute('base64')
    
    let content = elem.textContent
    if (content) {
        if (isBase64 === 'true') {
            content = atob(content)
        }
        content = content.split(DELIMETER).slice(1).join(DELIMETER)

        switch(extension) {
            case 'js':
                content = beautify_js(content)
                break
            case 'css':
                content = beautify_css(content)
                break
            default:
                break
        }
    }

    return {
        data: elem.textContent,
        body: content
    }
}


const tryFetchSourceMap = (url: string): string | undefined => {
    const _url = new URL(url)
    _url.pathname += '.map'
    
    console.log('NEW URL', _url)
    return undefined
}


export const parseItem = (item: Element): Item => {
    const hostE = item.getElementsByTagName('host')[0]
    const url = item.getElementsByTagName('url')[0].textContent!
    const extension = item.getElementsByTagName('extension')[0].textContent

    return {
            url,
            host: hostE.textContent!,
            ip: hostE.getAttribute('ip')!,
            method: item.getElementsByTagName('method')[0].textContent!,
            path: item.getElementsByTagName('path')[0].textContent!,
            status: item.getElementsByTagName('status')[0].textContent!,
            mimetype: item.getElementsByTagName('mimetype')[0].textContent!,
            extension: extension,
            request: parseRequestOrResponse(item.getElementsByTagName('request')[0], extension),
            response: parseRequestOrResponse(item.getElementsByTagName('response')[0], extension),
            // TODO: js_sourcemap: extension === 'js' && tryFetchSourceMap(url) || undefined
    }
}
