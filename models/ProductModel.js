import {Sequelize} from "sequelize";
import  db from "../config/Datbase.js";
import User from "./UserModel.js";

const {DataTypes}= Sequelize;

const Product=db.define('product',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },
    price:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,

        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },

},{
    freezeTableName:true
});
User.hasMany(Product);
Product.belongsTo(User,{foreignKey:'userId'});
export default Product;