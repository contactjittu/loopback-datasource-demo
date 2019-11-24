let ds: any;

/**
 *
 *
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
              authorization: headers.auth,
              access_token: headers.token,
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
   *
   *
   * @returns
   * @memberof CreateDataSource
   */
  public getDataSource() {
    return ds;
  }
}
module.exports = CreateDataSource;
