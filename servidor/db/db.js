
import mongoose from "mongoose"
import { config } from "dotenv"
config()

mongoose.connect(process.env.MONGODB_CONECTION)
console.log(process.env.MONGODB_CONECTION)

const gastosSchema = mongoose.Schema({
        realizado:{
            type:String,
            require:true
        },
        nombre:{
            type: String,
            require: true
        },
        tipo:{
            type: String,
            require: true
        },
        mes:{
            type:String,
            require: true
        },
        monto:{
            type:Number,
            require: true
        },
        fecha:{
            type:Date,
            require: true
        }

    })
const Gastos = mongoose.model('gastos', gastosSchema)


export{
    Gastos
} 
/* const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });
  async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const Movie = sequelize.define('Movie',{
    id: {
        type: DataTypes.INTEGER,
        autoIncremental:true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING
    },
    year:{
        type: DataTypes.INTEGER
    },
    stars:{
        type:DataTypes.FLOAT
    },
    urlImg:{
        type:DataTypes.STRING
    }

},{
    timestamps: false
})

const Gender = sequelize.define('Gender',{
    id: {
        type: DataTypes.INTEGER,
        autoIncremental:true,
        primaryKey: true
 
    },
    gender:{
        type: DataTypes.STRING
    }
},{
    timestamps: false
})

/* Movie.Gender = Movie.belongsTo(Gender) 

Movie.sync()
Gender.sync()


export{
    Gender,
    Movie
} */
