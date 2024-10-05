import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class ViTri extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_vi_tri: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tinh_thanh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    quoc_gia: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hinh_anh: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ViTri',
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
    ]
  });
  }
}
