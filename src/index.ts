import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import 'dotenv/config';
import App from './app';
import Mongo from './utils/mongoose';
import FileSystem from './utils/fileSystem';

console.clear()

new Mongo()

const app = express();

app.use(express.json());
console.log("\x1b[32m[Process] The process is running. Please wait a momentarily...")
console.log("[Express] Json Success");

app.use(express.urlencoded({ extended: true }));
console.log("[Express] urlencoded Success");

app.use(bodyParser.json({ type: 'application/*+json' }));
console.log("[Express] Body-Parser Success");

app.use(cookieParser());
console.log("[Express] Cookie-Parser Success");

app.use(cors())
console.log("[Express] Cors Open Success");

const fs = new FileSystem()

fs.mkdir('/public/', 'result', 'Ignore')
fs.mkdir('/public/', 'tmp', 'Ignore')

new App(app);