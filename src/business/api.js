import {API, HOST, PORT} from './config';

async function getResultList({filter, page=1}) {
    const response = await fetch(
        `${HOST}${API}/jobs/${filter}/?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }
    );

    if (response.ok) {
        const responseJson = await response.json();
        return {
            results: responseJson.results,
            hasPrevious: responseJson.previous !== null,
            hasNext: responseJson.next !== null
        };
    }
    throw new Error('Network response was not ok.');
}

async function postJob({id, url}) {
    const body = {
        classifier_used: id,
        url
    };
    const response = await fetch(
        `${HOST}${API}/jobs/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify(body)
        }
    );

    if (response.ok) {
        const responseJson = await response.json();
        return responseJson;
    }
    throw new Error('Network response was not ok.');
}

async function getClassifiers() {
    const response = await fetch(
        `${HOST}${API}/classifiers/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }
    );

    if (response.ok) {
        const responseJson = await response.json();
        return responseJson.results;
    }
    throw new Error('Network response was not ok.');
}


async function getSingleResult({id}) {
    const jobResponse = await fetch(
        `${HOST}${API}/jobs/${id}/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }
    );
    if (!jobResponse.ok)
        throw new Error('Network response was not ok.');

    let responseJson = await jobResponse.json();
    const pageId = responseJson.page_id;

    // fetch page content
    const pageResponse = await fetch(
        `${HOST}${API}/pages/${pageId}/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'
        }
    );
    if (!pageResponse.ok)
        throw new Error('Network response was not ok.');
    const pageResponseJson = await pageResponse.json();
    responseJson.content = pageResponseJson.content;

    return responseJson;
}

export {
    getResultList,
    getSingleResult,
    getClassifiers,
    postJob
}
    ;

