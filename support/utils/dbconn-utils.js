/* eslint-disable consistent-return */
const sql = require('mssql');
const dbConfig = require('../../configs/db-config');
const logger = require('../../setup/logger');

class DBConnUtils {
  /**
   * @Function_Name : executeSQL
   * @Description : Execute a SQL query or stored proc with no parameters.
   * @Params : query, the string sql query or stored proc name
   * @returns : a SQL result set
   */
  async executeSQL(query) {
    try {
      await sql.connect(dbConfig);
      const request = new sql.Request();
      const result = await request.query(query);
      sql.close();
      return result.recordsets[0];
    } catch (err) {
      sql.close();
      logger.info(err);
    }
  }

  /**
   * @Function_Name : executeSpWithParams
   * @Description : Execute a SQL stored procedure with parameters.
   * @Params : query, the string sql query or stored proc name
   *          params, an array of objects in the form {name: name of parameter,dbtype: sqltype of parameter,val: value of parameter }
   * @returns : a SQL result set
   */
  async executeSpWithParams(query, params) {
    try {
      await sql.connect(dbConfig);
      const request = new sql.Request();
      params.forEach((param) => {
        request.input(param.name, param.dbtype, param.val);
      });
      const result = await request.execute(query);
      sql.close();
      return result.recordsets[0];
    } catch (err) {
      sql.close();
      logger.info(err);
    }
  }

  /**
   * @Function_Name : getNextUser
   * @Description : Gets the next user from the DB that does not have a status of 'Processing'
   * @Params :
   * @returns : a user name (string) or NULL if there are no users
   */
  async getNextUser() {
    const dbResult = await this.executeSQL('Playwright_GetNextUser');
    const dbResultsJSON = JSON.parse(JSON.stringify(dbResult));
    const a = dbResultsJSON[0];
    return a.pw_user_name;
  }

  /**
   * @Function_Name : getAllUsers
   * @Description : Gets all Users from the DB
   * @Params :
   * @returns : a 2D array of user data
   */
  async getAllUsers() {
    return this.convertRStoArray(await this.executeSQL('SELECT * FROM [qa_pw_user_account]'));
  }

  /**
   * @Function_Name : convertRStoArray
   * @Description : Converts a result set from JSON format to 2D array of values.
   * @Params : resultSet, the JSON formed result set
   * @returns : a 2D array of values
   */

  /*
  *********commented below methods. resolve the linting errors below to proceed


  convertRStoArray(resultSet) {
    let retVal = [][0];
    if (resultSet.constructor === Array && resultSet.length > 0) {
      const rowLength = resultSet.length;
      const columnLength = Object.keys(resultSet[0]).length;
      retVal = new Array(rowLength);
      for (let i = 0; i < rowLength; i++) {
        retVal[i] = new Array(columnLength);
        let j = 0;
        for (const key in resultSet[i]) {
          retVal[i][j] = resultSet[i][key];
          j++;
        }
      }
    }
    return retVal;
  }
    */

  /**
   * @Function_Name : releaseUser
   * @Description : sets the passed in user status to 'Available' in the DB.
   * @Params : user_name, the user name of the user to be released
   * @returns : a SQL result set
   */

  /*
    *********commented below methods. resolve the linting errors below to proceed

  async releaseUser(user_name) {
    return this.executeSpWithParams('Playwright_ReleaseUser', [{ name: 'UserName', dbtype: sql.VarChar(100), val: user_name }]);
  }
  */
}

module.exports = { DBConnUtils };
