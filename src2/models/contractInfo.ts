import { DataTypes, Sequelize } from 'sequelize';
import { Uid } from './model';

// Contract_info Class extends from Model of Sequelize class.
export class Contract_info extends Uid {
  declare check_known_address_only: number;
  declare client_id: number;
  declare type: string;
  declare address: string;
  declare name: string;
  declare symbol: string;
  declare decimals: number;
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
    timestamps: false,
    collate: 'tf8mb4_bin'
  });
}
