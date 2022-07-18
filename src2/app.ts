import { Sequelize } from 'sequelize/types';
import { sync, Test, initSequelize, initiate} from './libraries';
import { findCertKey } from './queries';


// model initiate\
initiate(initSequelize);

// syncing start
await sync(initSequelize);

//query
// await findCertKey(Test);
await findCertKey();