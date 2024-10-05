import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Phong extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_phong: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    khach: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phong_ngu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    giuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phong_tam: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mo_ta: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gia_tien: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    may_giat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ban_la: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tivi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dieu_hoa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    bep: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    do_xe: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ho_boi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    ban_ui: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    hinh_anh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ma_vi_tri: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ViTri',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Phong',
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
        name: "fk_vi_tri",
        using: "BTREE",
        fields: [
          { name: "ma_vi_tri" },
        ]
      },
    ]
  });
  }
}
