import { Model, Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
config();
// import { modelInit } from './dbInit';

const sequelize = new Sequelize('test', 'root', 'samquinn123!', {
  host: '141.164.56.120',
  port: 3306,
  dialect: 'mariadb',
  logging: console.log
});

async function auth(sequelize: Sequelize){
  try {
    await sequelize.authenticate();
    console.log('@@@@@@@@@@@@@@@@@@@@');
    console.log('Connected');
    console.log('@@@@@@@@@@@@@@@@@@@@');
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

export class Test extends Model {
  // public uid: number;
  // public name: string;
  // public client_id: number;
  // public auth_key: string;
};

Test.init ({
  uid: {
    type: DataTypes.TINYINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  client_id: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '클라이언트 ID',
    defaultValue: 1,
  },

  name:{
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '이름',
    defaultValue: 'etra',
  },

  auth_key: {
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '인증키',
    defaultValue: 'pop',
  },

  
}, { 
sequelize,
tableName: 'client_info',
modelName: 'Test',
freezeTableName: true
})

async function sync(sequelize: Sequelize) {
  await sequelize.sync();
  const test = Test.create();
  console.log(Test instanceof Test);
};

await auth(sequelize);
await sync(sequelize);