import {API, HOST, PORT} from './config';

async function getResultList({filter}) {
    const response = await fetch(
        `${HOST}:${PORT}${API}/jobs/${filter}/`, {
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

async function postJob({id, url}) {
    const body = {
        classifier_used: id,
        url
    };
    const response = await fetch(
        `${HOST}:${PORT}${API}/jobs/`, {
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
        `${HOST}:${PORT}${API}/classifiers/`, {
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
        `${HOST}:${PORT}${API}/jobs/${id}/`, {
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
        `${HOST}:${PORT}${API}/pages/${pageId}/`, {
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

