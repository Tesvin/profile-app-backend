import mongoose from 'mongoose'
import 'dotenv/config'

const connect = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db Connected')
    } catch (error) {
        console.log('DB Connection Error')
    }
}

export default connect;