import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _BinhLuan from  "./BinhLuan.js";
import _DatPhong from  "./DatPhong.js";
import _NguoiDung from  "./NguoiDung.js";
import _Phong from  "./Phong.js";
import _ViTri from  "./ViTri.js";

export default function initModels(sequelize) {
  const BinhLuan = _BinhLuan.init(sequelize, DataTypes);
  const DatPhong = _DatPhong.init(sequelize, DataTypes);
  const NguoiDung = _NguoiDung.init(sequelize, DataTypes);
  const Phong = _Phong.init(sequelize, DataTypes);
  const ViTri = _ViTri.init(sequelize, DataTypes);

  BinhLuan.belongsTo(NguoiDung, { as: "ma_nguoi_binh_luan_NguoiDung", foreignKey: "ma_nguoi_binh_luan"});
  NguoiDung.hasMany(BinhLuan, { as: "BinhLuans", foreignKey: "ma_nguoi_binh_luan"});
  DatPhong.belongsTo(NguoiDung, { as: "ma_nguoi_dat_NguoiDung", foreignKey: "ma_nguoi_dat"});
  NguoiDung.hasMany(DatPhong, { as: "DatPhongs", foreignKey: "ma_nguoi_dat"});
  BinhLuan.belongsTo(Phong, { as: "ma_cong_viec_Phong", foreignKey: "ma_cong_viec"});
  Phong.hasMany(BinhLuan, { as: "BinhLuans", foreignKey: "ma_cong_viec"});
  DatPhong.belongsTo(Phong, { as: "ma_phong_Phong", foreignKey: "ma_phong"});
  Phong.hasMany(DatPhong, { as: "DatPhongs", foreignKey: "ma_phong"});

  return {
    BinhLuan,
    DatPhong,
    NguoiDung,
    Phong,
    ViTri,
  };
}
