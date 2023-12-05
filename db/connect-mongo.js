const mongoose = require('mongoose');



const getConnection = async () => {
    try {
        const url = 'mongodb://darwindanielsdt:crsalamfjts123@ac-itoce6w-shard-00-00.ibobb5f.mongodb.net:27017,ac-itoce6w-shard-00-01.ibobb5f.mongodb.net:27017,ac-itoce6w-shard-00-02.ibobb5f.mongodb.net:27017/jwt_g34?ssl=true&replicaSet=atlas-12r1yp-shard-0&authSource=admin&retryWrites=true&w=majority';

        await mongoose.connect(url);
        console.log('conexion exitosa');
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getConnection,
}


