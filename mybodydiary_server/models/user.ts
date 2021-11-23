import { DataTypes, Model } from 'sequelize'
import { Column, Table } from 'sequelize-typescript'
import { sequelize } from './index'

interface UsersAttributes {
  id: string,
  email : string,
  password : string
}

@Table({
  tableName: 'user_info'
})
export class User extends Model<UsersAttributes>{
  @Column({primaryKey: true})
  public id! : string

  @Column
  public email! : string

  @Column
  public password! : string

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
