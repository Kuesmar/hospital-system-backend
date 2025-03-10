import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hospital', process.env.DB_USERNAME ?? '', process.env.DB_PASSWORD ?? '', {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres'
});

export const auth = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default sequelize;
