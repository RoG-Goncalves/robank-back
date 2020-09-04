import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = `mongodb+srv://${process.env.USERDB}:${process.env.PWDDB}@cluster0.liceb.azure.mongodb.net/grade?retryWrites=true&w=majority`;

export { db };
