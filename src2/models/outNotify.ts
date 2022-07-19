import { DataTypes, Sequelize } from 'sequelize';
import { Notify } from './model';

export class OutNotifyInfo extends Notify {}


export function outNotifyInit (sequelize: Sequelize) {
  OutNotifyInfo.init ({
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    client_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '클라이언트 uid',
    },

    tx_id: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: 'TX uid',
    },

    contract_address: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      comment: '클라이언트 uid',
    },

    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: '컨트랙트 이름 혹은 BASE_CURRENCY',
    },

    symbol: {
      type: DataTypes.STRING(256),
      comment: '컨트랙트 심볼 혹은 BASE_CURRENCY',
      allowNull: false,
    },

    from_address: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      comment: '대상 주소'
    },

    to_address: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      comment: '입금 주소',
    },

    amount: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: '자릿수 계산 전 수량',
    },

    decimals: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '자릿수 계산을 위해 나눌 10의 승수값',
    },

    token_id: {
      type: DataTypes.STRING(256),
      defaultValue: null,
      comment: 'ERC_721 일 경우 token id'
    },

    status: {
      type: DataTypes.STRING(2),
      comment: '처리 상태; 00-생성, 60-완료, 99-실패',
      defaultValue: '00',
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
    tableName: 'out_notify_info',
    modelName: 'OutNotifyInfo',
    freezeTableName: true,
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: false,
  })
}
