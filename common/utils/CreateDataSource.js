"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let ds;
class CreateDataSource {
    constructor(url, headers) {
        ds = {
            connector: "rest",
            operations: [
                {
                    template: {
                        method: "GET",
                        url,
                        headers: {
                            apikey: headers.apikey,
                        },
                    },
                    functions: {
                        configservice: [],
                    },
                },
            ],
        };
    }
    getDataSource() {
        return ds;
    }
}
exports.CreateDataSource = CreateDataSource;
module.exports = CreateDataSource;
//# sourceMappingURL=CreateDataSource.js.map