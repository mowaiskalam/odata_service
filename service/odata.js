const request = require('request-promise-native');

const baseUrl = 'https://services.odata.org/TripPinRESTierService';

const getPeoples = async (field, searchText) => {
    let url = `${baseUrl}/People`;
    if (searchText) {
        url += `?$filter=contains(${field}, '${searchText}')`
    }
    const res = await request.get(url);
    return res ? JSON.parse(res).value : [];
}

const getPeopleByUsername = async (username) => {
    const res = await request.get(`${baseUrl}/People('${username}')`);
    return res ? JSON.parse(res) : null;
}

const updatePeople = async (username, body) => {
    const res = await request({
        url: `${baseUrl}/People('${username}')`,
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(body)
    });
    return res ? JSON.parse(res) : null;
}

module.exports = {
    getPeoples,
    getPeopleByUsername,
    updatePeople
}