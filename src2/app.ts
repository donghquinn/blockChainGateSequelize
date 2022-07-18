import { Sequelize } from 'sequelize/types';
import { sync, initSequelize, client_init } from './libraries';
import { findCertKey } from './queries';


// model initiate\
client_init(initSequelize);

// syncing start
await sync(initSequelize);

//query
// await findCertKey(Test);
await findCertKey();