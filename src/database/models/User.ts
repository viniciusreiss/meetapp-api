import { Sequelize, Model, DataTypes, Optional } from 'sequelize'
import bcrypt from 'bcrypt'

export interface UserAttributes {
  id: number
  name: string
  email: string
  password: string
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: number
  public name!: string
  public email!: string
  public password!: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        password: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          validate: {
            notEmpty: true,
            min: 8
          }
        },
        email: {
          type: new DataTypes.STRING(128),
          allowNull: false,
          validate: {
            isEmail: true,
            notEmpty: true
          }
        }
      },
      {
        tableName: 'users',
        sequelize
      }
    )
    User.addHook('beforeSave', async (user: User) => {
      user.password = await bcrypt.hash(user.password, 8)
    })
  }

  passwordCheck(password: string) {
    return bcrypt.compare(password, this.password)
  }
}

export default User
