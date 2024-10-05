import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class BinhLuan extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ma_cong_viec: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Phong',
        key: 'id'
      }
    },
    ma_nguoi_binh_luan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'NguoiDung',
        key: 'id'
      }
    },
    ngay_binh_luan: {
      type: DataTypes.DATE,
      allowNull: true
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sao_binh_luan: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'BinhLuan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "ma_cong_viec",
        using: "BTREE",
        fields: [
          { name: "ma_cong_viec" },
        ]
      },
      {
        name: "ma_nguoi_binh_luan",
        using: "BTREE",
        fields: [
          { name: "ma_nguoi_binh_luan" },
        ]
      },
    ]
  });
  }
}
