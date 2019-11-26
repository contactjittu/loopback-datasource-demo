let ds: any;

/**
 * @export
 * @class CreateDataSource
 */
export class CreateDataSource {
  constructor(url: string, headers: any) {
    ds = {
      connector: "rest",
      operations: [
        {
          template: {
            method: "GET",
            url,
            headers: {
              // authorization: headers.auth,
              apikey: headers.apikey,
            },
          },
          functions: {
            configservice: [
            ],
          },
        },
      ],
    };
  }
  /**
   * @returns
   * @memberof CreateDataSource
   */
  public getDataSource() {
    return ds;
  }
}
module.exports = CreateDataSource;
