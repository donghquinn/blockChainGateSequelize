import { Model, Sequelize, DataTypes, literal, CreationOptional } from 'sequelize';
import { config } from 'dotenv';
import { initSequelize } from './sequelize'

config({ path: '../../'});

// generate Test class extend from 'Model' class of Sequelize
export class Test extends Model {
  declare uid: CreationOptional<number>;
  declare name: string;
  declare client_id: number;
  declare auth_key: string;
  declare cert_key: string;
  declare cert_key_callback: string;
  declare income_callback: string;
  declare outcome_callback_tx: string | null;
  declare outcome_callback: string | null;
  declare memo: string | null;
  declare created: Date;
  declare updated: Date;
}

// Model Initiating : which means generating Tables on the DataBase
export function initiate (sequelize: Sequelize) { 
  Test.init ({
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    client_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      comment: '클라이언트에게 보낼 JWT 암호화 키',
      defaultValue: "1",
    },

    income_callback: {
      type: DataTypes.STRING(512),
      allowNull: false,
      comment: '입금알림 콜백 주소',
      defaultValue: '1'
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
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '생성 타임스탬프'
    },

    updated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      comment: '수정 타임스탬프'
    }
  }, { 
    sequelize,
    tableName: 'client_info',
    modelName: 'Test',
    freezeTableName: true,
    charset: 'utf8mb4',
    engine: 'InnoDB',
    timestamps: false
  });
};

export async function findCertKey() { 
  try {
    await Test.findOne({
      attributes: ['cert_key'],
      where: { client_id: '(?)'}
    })
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}
