import { Sequelize } from 'sequelize'
import UserModel from '@database/models/User'

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  define: {
    timestamps: true,
    underscored: true
  }
})

const models = [UserModel]

models.map(model => model.initModel(sequelize))

export const isDbConnected = async () => {
  await sequelize.authenticate()
  console.log('got connection with data base')
}

export default sequelize
