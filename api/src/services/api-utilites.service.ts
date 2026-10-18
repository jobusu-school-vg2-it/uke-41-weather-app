import type { ApiRequestParams } from '../types/index.types.js';

export function assembleRequestUrl(baseUrl: string, requestParams: ApiRequestParams[]): URL {
    if (!baseUrl) { throw new Error("Parameter 'baseUrl' must not be empty"); }
    if (!requestParams) { throw new Error("Parameter 'requestParams' must not be empty"); }

    const url = new URL(baseUrl);

    // Loops over all input parameters and adds them to the URL
    for (const param of requestParams) {
        url.searchParams.set(param[0], param[1]);
    }

    return url;
}