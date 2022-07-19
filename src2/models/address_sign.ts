import { DataTypes, Sequelize } from 'sequelize';
import { AddressInfo } from './model';


export class AddressSignInfo extends AddressInfo {}

export function addressSignInit (sequelize: Sequelize) {
  AddressSignInfo.init ({
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
      comment: '주소',
      unique: true,
    },

    client_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '클라이언트 uid',
    },

    memo: {
      type: DataTypes.STRING(512),
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
  } , {
    sequelize,
    tableName: 'address_sign_info',
    modelName: 'Address_sign_info',
    freezeTableName: true,
    charset: 'utf8mb4',
    engine: 'InnoDB',
    timestamps: false,
    collate: 'utf8mb4_bin',
  })
}
