import { OutRequestInfo } from '../models';
import { Sequelize } from 'sequelize';

// from_address 를 이용해 가장 최신 nonce를 가져오기
export async function findLatestNonceByFrom () {
  try {
    const latestNonce = await OutRequestInfo.findOne({
      attributes: ['nonce'],
      where: { from_address: '?' },
      order: [['uid', 'DESC']],
      limit: 1,
    });
    console.log(latestNonce);

    return latestNonce;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}
