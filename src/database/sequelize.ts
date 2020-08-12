import { Sequelize } from 'sequelize'

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

const models = []

models.map(model => model.initModel(sequelize))

export const isDbConnected = async () => {
  await sequelize.authenticate()
}

export default sequelize
