import { sync, initSequelize, authenticate } from './libraries';
import { 
  clientInit,
  addressLookupInit,
  addressSignInit,
  block_init,
  contract_init,
  outRequestInfoInit,
  inNotifyInit,
  outNotifyInit,
  outRequestFailInit,
} from './models';
import { findCertKey, findCallBackInfo, findauthByKey, findLatestNonceByFrom } from './queries';

await authenticate(initSequelize);

// models initiate
clientInit(initSequelize);
addressLookupInit(initSequelize);
addressSignInit(initSequelize);
block_init(initSequelize);
contract_init(initSequelize);
outRequestInfoInit(initSequelize);
outNotifyInit(initSequelize);
outRequestFailInit(initSequelize);
inNotifyInit(initSequelize);

// syncing start
await sync(initSequelize);

//query

await findLatestNonceByFrom();
