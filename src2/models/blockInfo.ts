import { Model, Sequelize, DataTypes, CreationOptional } from 'sequelize';
import { Uid } from './model';

// Block_info class extends from Model
export class Block_info extends Uid {
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
    collate: 'utf8mb4_bin'
  })
};
