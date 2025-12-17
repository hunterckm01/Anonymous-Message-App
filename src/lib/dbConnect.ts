import mongoose from 'mongoose'

type ConnectionObj = {
    isConnected?: number
}

const connection: ConnectionObj = {}

async function dbConnect(): Promise<void>{
    try{
        if(connection.isConnected){
            console.log("Already Connected to DB");
            return;
        }

        const db = await mongoose.connect(process.env.MONGODB_URI || '', {});
        // console.log(db);
        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
    }
    catch(err){
        console.log("Database Connection Failed", err);
        process.exit(1);
    }
}

export default dbConnect;