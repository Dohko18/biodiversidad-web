import React from 'react';
import {ErrorLoadingModule} from "./ErrorLoadingModule";

declare var remotes: any;

export const loadScope = (url: any, scope: any) => {
    const element = document.createElement('script');
    const promise = new Promise((resolve, reject) => {
        element.src = url
        element.type = 'text/javascript'
        element.async = true
        element.onload = () => resolve(window[scope])
        element.onerror = reject
    }).catch((error) => {
        console.error(error)
        return {
            url: url,
            hasError: true,
            error: error
        }
    })
    document.head.appendChild(element)
    promise.finally(() => document.head.removeChild(element))
    return promise
}

export const loadModule = async (scope: string, module: string) => {

    const url = remotes[scope]

    if (!url) {
        console.error(`Module ${scope} not found`, "list", remotes)
    }

    const container = await loadScope(url, scope)

    // @ts-ignore
    if (!container.hasError) {
        // @ts-ignore
        await __webpack_init_sharing__('default');
        // @ts-ignore
        await container.init(__webpack_share_scopes__.default)
        // @ts-ignore
        const factory = await container.get(module)
        return factory()
    } else {
        // @ts-ignore
        return {
            default: () => <ErrorLoadingModule error={container}/>
        }
    }
}