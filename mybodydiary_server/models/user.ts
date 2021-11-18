import {
  DataTypes, 
  Model
} from 'sequelize';
import {sequelize} from './index'

interface UsersAttributes {
  id: string,
  email : string,
  password : string,
  created : Date
}

export class User extends Model<UsersAttributes>{
  public id! : string
  public email! : string
  public password! : string
  public created! : Date

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id : {
      type : DataTypes.STRING(128),
      primaryKey: true,
      allowNull : false
    },
    email : {
      type : DataTypes.STRING(128),
      allowNull: false
    },
    password : {
      type : DataTypes.STRING(128),
      allowNull : false
    },
    created : {
      type : DataTypes.DATE,
      allowNull : false
    }
  },
  {
    modelName : 'User',
    tableName : 'user_info',
    sequelize,
    freezeTableName : true,
    timestamps : true,
    updatedAt : 'updateTimestamp'
  }
)
