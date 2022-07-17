import { Model, Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
import { timeStamp } from 'console';

config({ path: '../../'});
// import { modelInit } from './dbInit';

// connect to the Database
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host:process.env.HOST,
  port: Number(process.env.PORT),
  dialect: 'mariadb',
  logging: console.log
});

// Check the connection.
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



// generate Test class extend from 'Model' class of Sequelize
export class Test extends Model {
  // public uid: number;
  // public name: string;
  // public client_id: number;
  // public auth_key: string;
};


// Model Initiating : which means generating Tables on the DataBase
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
    comment: '클라이언트가 보낼 단순 조회용 키',
    defaultValue: 'pop',
  },

  cert_key: {
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '클라이언트가 보낼 JWT 암호화 키',
    defaultValue: 'st',
    unique: true
  },

  cert_key_callback: {
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '클라이언트에게 보낼 JWT 암호화 키'
  },

  income_callback: {
    type: DataTypes.STRING(512),
    allowNull: false,
    comment: '입금알림 콜백 주소'
  },

  outcome_callback_tx: {
    type: DataTypes.STRING(512),
    allowNull: true,
    defaultValue: null,
    comment: '출금 TXID 콜백 주소',
  },

  outcome_callback: {
    type: DataTypes.STRING(512),
    allowNull: true,
    defaultValue: null,
    comment: '출금알림 콜백 주소'
  },

  memo: {
    type: DataTypes.STRING(512),
    allowNull: true,
    defaultValue: null,
    comment: '메모'
  },

  created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    comment: '생성 타임스탬프'
  },

  updated: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP'),
    comment: '수정 타임스탬프'
  }
  
}, { 
sequelize,
tableName: 'client_info',
modelName: 'Test',
freezeTableName: true
})

// Sync the model to the Database
async function sync(sequelize: Sequelize) {
  await sequelize.sync();
  const test = Test.create();
  console.log(Test instanceof Test);
};

// Run
await auth(sequelize);
await sync(sequelize);

