import { Op, QueryError } from 'sequelize';
import { AddressSignInfo, AddressLookupInfo, ClientInfo, AddressInfo } from '../models';


// AddressSignInfo 모델 클래스 중 address 와 client_id 를 담은 객체를 파라미터로 넘기는 함수
export async function findAllSignAddress (params: Pick<AddressSignInfo, 'address' | 'client_id'>) {
  try {
    const allSignAddress = await AddressSignInfo.findAll({
      attributes: ['address', 'client_id'],
      where: { address :{
        [Op.in] : params,
      }}
    });

    console.log(allSignAddress);
    return allSignAddress;
  } catch (err) {
    if (err instanceof QueryError) {
      throw err;
    }
  }
}

// AddressLookupInfo 모델 클래스의 필요한 요소들을 뽑아 만든 오브젝트를 파라미터로 넘기는 함수
export async function findAllLookupAddress (params: Pick<AddressLookupInfo, 'address' | 'client_id' | 'in_notify' | 'out_notify'>) {
  try {
    const allLookupAddress = await AddressLookupInfo.findAll({
      attributes: ['address', 'client_id', 'in_notify', 'out_notify'],
      where: { address : {
        [Op.in] : params,
      }}
    })
    console.log(allLookupAddress);

    return allLookupAddress;
  } catch (err) {
    if (err instanceof QueryError) {
      throw err;
    }
  }
}

// AddressLookupInfo 에서 뽑은 키들을 담은 객체를 파라미터로 담아, ClientInfo 모델과 Left Outer Join 으로 원하는 값을 추출해 낸다.

// TODO LeftOuterJoin 구현하기
export async function findAllLookupAddressWithCallbackInfo (params: Pick<AddressLookupInfo, 'address' | 'client_id' | 'in_notify' | 'out_notify'>) {
  // Associate Each Models.
  AddressLookupInfo.hasMany(ClientInfo, {foreignKey: 'client_id', as: 'C'})
  ClientInfo.belongsTo(AddressLookupInfo, {foreignKey: 'client_id', as: 'A'})

  try { 
    const allLookupAddressWithCallBackInfo = await AddressLookupInfo.findAll({
      attributes: ['address', 'A.client_id', 'in_notify', 'out_notify', 'cert_key_callback', 'income_callback'],
      where: { address: {
        [Op.in]: params,
      }},
      include: [{
        model: ClientInfo, as: 'C',
        required: false,
        attributes: ['client_id'],
      }],
    })
    console.log(allLookupAddressWithCallBackInfo);

    return allLookupAddressWithCallBackInfo;
  } catch (err) {
    if (err instanceof QueryError) {
      throw err;
    }
  }
}

export async function insertSignAddress() {
  try {
    const inserted = await AddressSignInfo.create( { address: '?', client_id: '?' })
    console.log(' It\'s inserted');
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function insertLookupAddress() {
  try {
    await AddressLookupInfo.create({ address: '?', client_id: '?'})
  } catch (err) {
    if (err instanceof QueryError) {
      throw err;
    }
  }
}
