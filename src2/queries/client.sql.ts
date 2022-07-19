import { QueryError, QueryTypes, Sequelize } from 'sequelize';
import { ClientInfo } from '../models';

/**
 * JWT 인증용 키 검색
 * replacements: 자동으로 쿼리가 데이터베이스에 전달되기 전에 벗어나는 역할
 * TODO: Sequelize 에서 prepared Statement 사용하는 방법 찾기
 * 참고 : https://stackoverflow.com/questions/49242772/how-to-create-prepared-statements-in-sequelize
 */

// TODO 다시 원래 쿼리로 되돌려 놓기
 export async function findCertKey(sequelize: Sequelize) { 
  try {
    const certKey = await sequelize.query(`SELECT cert_key FROM ${process.env.CLIENT_TABLE} WHERE = ?`,
    {
      replacements: ['id'],
      type: QueryTypes.SELECT,
    });
    console.log(certKey);

    return certKey;
  } catch (err) {
    if (err instanceof QueryError) {
      throw err;
    } else { console.log('Find Cert Key Error has not been occured by Query Statement. Check the Syntax') }
  };
}

/**
 * 단순 조회용 API 를 위한 인증키 검색
 */
export async function findauthByKey (sequelize: Sequelize) {
  try { 
    const authByKey = await sequelize.query(`SELECT client_id FROM ${process.env.CLIENT_TABLE} WHERE client_id = ?`,
    {
      replacements: ['authKey']
    })
    console.log(authByKey);

    return authByKey;
  } catch (err) {
    if (err instanceof QueryError) {
      throw err;
    } else { console.log('Find Auth Key Error has not been occured by Query Statement. Check the Syntax') }
  }
}

// prepared statement
// TODO 다시 원래 쿼리로 되돌려 놓기
export async function findCallBackInfo(sequelize: Sequelize) {
  try {
    const callBackInfo = await sequelize.query(`
    SELECT 
      cert_key_callback, income_callback, outcome_callback, outcome_callback_tx
    FROM
      ${process.env.CLIENT_TABLE}
    WHERE
      client_id = ?
    `,
    {
      replacements: ['client_id'],
      type: QueryTypes.SELECT,
    })
    console.log('Found the Cert_Key!');
    console.log(callBackInfo);

    return callBackInfo;
  } catch (err) { 
    if (err instanceof QueryError) {
      throw err;
    } else { console.log('Find Call Back Info Error has been occured out of the Query statement. Please Check the syntax'); }
  }
}
