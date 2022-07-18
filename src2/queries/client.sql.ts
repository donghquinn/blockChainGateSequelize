import { Model, Op } from 'sequelize';
import { Test, initiate, initSequelize } from '../libraries';
// Op means Operators.

/**
 * JWT 인증용 키 검색
 * replacements: 자동으로 쿼리가 데이터베이스에 전달되기 전에 벗어나는 역할
 * TODO: Sequelize 에서 prepared Statement 사용하는 방법 찾기
 * 참고 : https://stackoverflow.com/questions/49242772/how-to-create-prepared-statements-in-sequelize
 */
 export async function findCertKey() { 
  try {
    await Test.findOne({
      attributes: ['cert_key'],
      where: { client_id: '(?)'}
    });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  };
}

/**
 * 단순 조회용 API 를 위한 인증키 검색
 */
export async function findauthByKey () {
  try { 
    await Test.findOne({
      attributes: ['client_id'],
      replacements: { auth_key: '(?)' },
      });
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findCallBackInfo() {
  try {
    await Test.findOne ({
      attributes: ['cert_key_callback', 'income_callback', 'outcome_callback', 'outcome_callback_tx'],
      replacements: { client_id: '?' }
    });
    console.log('Found the Cert_Key!');
  } catch (err) { 
    if (err instanceof Error) {
      throw err;
    }
  }
}
