import { createClient } from 'contentful';

import { contentfulConfig } from './contentfulConfig';

const Client = () =>
    createClient({
        ...contentfulConfig,
    });

export const ClientNoLinkResolve = () =>
    createClient({
        resolveLinks: false,
        ...contentfulConfig,
    });

/**
 * Fetch a set of the specified content type
 *
 * See the Contentful docs for a complete list of query options:
 * @link https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters
 *
 * @param type
 * @param query
 * @params options
 *      * raw_results: set to true if you want the raw api response from Contentful
 * @returns {Promise<Array[ContentfulEntity]>}
 */
export async function fetchAll(type, query = {}, options = { cleanup: true }) {
    query.content_type = type;
    const results = await Client().getEntries(query);

    if (!results.items) {
        return [];
    }
    const items = results.items;
    for (let key in items) {
        items[key] = options.cleanup
            ? cleanupContentfulData(items[key])
            : items[key];
    }
    return items;
}

/**
 * Fetch a single content item
 *
 * See the Contentful docs for a complete list of query options:
 * @link https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters
 *
 * @param type
 * @param query
 * @params options
 *      * raw_results: set to true if you want the raw api response from Contentful
 * @returns {Promise<ContentfulEntity>}
 */
export async function fetchOne(type, query = {}, options = { cleanup: true }) {
    query.include = query.include || 6;

    const results = await fetchAll(type, query, options);
    if (results && results.length) {
        return options.cleanup ? cleanupContentfulData(results[0]) : results[0];
    }
    return null;
}

/**
 * Utility function to cleanup Contentful data by recursively removing the 'fields' key and moving data up the object
 *
 * @param path
 * @returns {Promise<ContentfulEntity>}
 *
 *
 */

export function cleanupContentfulData(data) {
    if (data.fields) {
        if (data.sys && data.sys.contentType && data.sys.contentType.sys) {
            // Preserve the content type id
            data.fields.id = data.sys.id;
            data.fields.contentTypeId = data.sys.contentType.sys.id;
        }
        data = data.fields;
    }
    for (let key in data) {
        let child = data[key];
        if (child?.fields) {
            data[key] = cleanupContentfulData(child);
        } else if (Array.isArray(child)) {
            for (let childKey in child) {
                let grandchild = child[childKey];
                if (grandchild.fields) {
                    child[childKey] = cleanupContentfulData(grandchild);
                }
            }
        }
    }
    return data;
}

export { Client };
