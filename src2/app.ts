import { sync, Test, initSequelize } from './libraries';


// model initiate
Test.initiate(initSequelize);

// syncing start
await sync(initSequelize);
