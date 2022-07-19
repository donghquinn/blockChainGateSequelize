import { DataTypes, Sequelize } from 'sequelize';
import { AddressInfo } from './model';

export class AddressLookupInfo extends AddressInfo {
  declare in_notify: number;
  declare out_notify: number;
}

export function addressLookupInit (sequelize: Sequelize) {
  AddressLookupInfo.init ({
    uid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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

    in_notify: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '입금알림 적용여부'
    },

    out_notify: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: '출금알림 적용여부',
    },

    memo: {
      type: DataTypes.STRING(512),
      defaultValue: null,
      comment: '메모',
    }
  }, {
    sequelize,
    modelName: 'AddressLookupInfo',
    tableName: 'address_lookup_info',
    freezeTableName: true,
    timestamps: false,
    engine: 'InnoDB',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
  })
}
