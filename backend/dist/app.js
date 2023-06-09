"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config(); //Reads .env file and makes it accessible via process.env
// const server = fastify();
const port = process.env.PORT;
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
    }
    catch (err) {
        console.log(err);
    }
});
connectToDB();
class User {
    constructor(id, username, password, email) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
app.get('/test', (req, res, next) => {
    pool.query('select * from users').then((response) => {
        // rows.forEach(row => {
        //   const user = new User(row.id, row.username, row.password, row.email);
        // })
        res.json({
            users: response.rows,
        });
    });
});
// server.get('/aaa', async (request, reply) => {
//   console.log('aaa');
//   const a = pool.query('select * from users').then((response) => {
//     // rows.forEach(row => {
//     //   const user = new User(row.id, row.username, row.password, row.email);
//     // })
//     reply.send({
//       users: response.rows,
//     });
//   });
// });
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
// server.listen({ port: 5001 }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   }
//   console.log(`Server listening at ${address}`);
// });
