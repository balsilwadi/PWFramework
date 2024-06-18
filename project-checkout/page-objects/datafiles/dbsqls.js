module.exports = {
  availability: {
    SQL_AVAILABILITY: 'SELECT * FROM AVAILABILITY WHERE SKU=@queryParam AND WAREHOUSE_ID=904',
    SQL_DPS_FLAG: "SELECT * FROM CONFIG WHERE DESCRIPTION='@queryParam'"
    // DTP_IsEnabled
  }
};
