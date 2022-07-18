// Sync the model to the Database
import { Sequelize } from 'sequelize';

// sync the Model Object with RDB Table.
export async function sync(sequelize: Sequelize) {
  try {
    // You should input 'force: true' option when You already have columns in the table.
    await sequelize.sync({ force: true });
    //const test = Test.create();
    console.log("@@@@@@@@@@@@@@@@@@@@");
    console.log('Syncing Table completed!');
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

// // Run
// await auth(sequelize);
// await sync(sequelize);

