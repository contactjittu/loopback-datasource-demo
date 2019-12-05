const CreateDataSource = require('../../common/utils/CreateDataSource');

describe('Util Create datasource', () => {
    const url = 'http://localhost:3000/test';
    const headers = {
        apikey: '123'
    }
    const createDataSource = new CreateDataSource(url, headers);
    console.log(createDataSource)
})