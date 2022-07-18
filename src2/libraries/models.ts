import { Model, Sequelize, DataTypes, CreationOptional } from 'sequelize';
import { config } from 'dotenv';

config({ path: '../../'});

// TODO Seperate all the classes one by one-file

// generate Test class extend from 'Model' class of Sequelize
export class Client_info extends Model {
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
export function client_init (sequelize: Sequelize) { 
  Client_info.init ({
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
    modelName: 'Client_info',
    freezeTableName: true,
    charset: 'utf8mb4',
    engine: 'InnoDB',
    timestamps: false
  });
};

// Contract_info Class extends from Model of Sequelize class.
export class Contract_info extends Model {
  declare uid: number;
  declare check_known_address_only: number;
  declare client_id: number;
  declare type: string;
  declare address: string;
  declare name: string;
  declare symbol: string;
  declare decimals: number;
  declare memo: string;
  declare created: Date;
  declare updated: Date;
}

// Init Contract_info Model
export function contract_init(sequelize: Sequelize) {
  Contract_info.init ({
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    client_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '내부발급/외부등록 주소 사용 안할 경우 클라이언트 uid',
      defaultValue: 1,
      unique: true
    },

    check_known_address_only:{
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: '내부발급/외부등록 주소 사용 여부',
      defaultValue: 1,
      unique: true
    },

    type: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: '컨트랙트 타입; ${BASE_CURRENCY}_(ERC_20/ERC_721)',
      defaultValue: 'ERC_20',
    },

    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: '컨트랙트 주소',
      defaultValue: '0x0000000000000',
      unique: true
    },

    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: '컨트랙트 이름',
      defaultValue: "ETRA",
    },

    decimals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '컨트랙트 소수 자릿수',
      defaultValue: '1'
    },

    memo: {
      type: DataTypes.STRING(512),
      allowNull: true,
      defaultValue: null,
      comment: '메모',
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
    tableName: 'contract_info',
    modelName: 'Contract_info',
    freezeTableName: true,
    charset: 'utf8mb4',
    engine: 'InnoDB',
    timestamps: false
  });
}

// Block_info class extends from Model
export class Block_info extends Model {
  declare uid: number;
  declare number: number;
  declare block_read_status: string;
  declare event_read_status: string;
  declare memo: string;
  declare created: Date;
  declare updated: Date;
}

// init Block_info Model
export function block_init (sequelize: Sequelize) {
  Block_info.init({
    uid: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true 
    },

    number: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '처리 예정 블럭 번호',
      unique: true,
    },

    block_read_status: {
      type: DataTypes.STRING(2),
      defaultValue: '00',
      comment: '처리 상태; 00-시작, 60-완료, 99-실패'
    },

    event_read_status: {
      type: DataTypes.STRING(2),
      defaultValue: '00',
      comment: "처리 상태; 00-시작, 60-완료, 99-실패"
    },

    memo: {
      type: DataTypes.STRING(512),
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
    modelName: 'Block_info',
    tableName: 'block_info',
    freezeTableName: true,
    charset: 'utf8mb4',
    engine: 'InnoDB',
    timestamps: false,
  })
};
