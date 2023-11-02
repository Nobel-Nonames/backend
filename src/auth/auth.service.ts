import { Request, Response } from "express";
import Mongo from "../utils/mongoose";
import authModel from "../entities/auth.entity";
import hash from "../utils/hash";
import jsonwebtoken from "../utils/jsonwebtoken";
import getRandom from "../utils/getRandom";
import fileSystem from "../utils/fileSystem";
import { validType } from "../utils/checkFunctions";

export default class AuthService {
  public async login(req: Request, res: Response) {
    const { username, password } = req.body

    const user = await new Mongo().findOne(authModel, {
      username
    })

    try {
      if (!user || user.password !== hash(password + user.salt)) throw ({ status: 400, message: '아이디 혹은 비밀번호를 확인해주세요.' })
    } catch (err: any) {
      return res.status(err.status).json({
        success: false,
        message: err.message
      })
    }

    const token = jsonwebtoken.sign({ uuid: user._id }, String(process.env.JWT_SECRET));

    return res.status(201).json({
      success: true,
      token
    })
  }

  public async signUp(req: Request, res: Response) {
    const { username, password, name, tel, usertype } = req.body;

    const user = await new Mongo().findOne(authModel, {
      username
    })

    try {
      if (!username) throw ({ status: 400, message: 'username(아이디)를 입력해주세요.' })
      if (!password) throw ({ status: 400, message: 'password(비밀번호)를 입력해주세요.' })
      if (!name) throw ({ status: 400, message: 'name(성함)을 입력해주세요.' })
      if (!tel) throw ({ status: 400, message: 'tel(전화번호)를 입력해주세요.' })
      if (!usertype) throw ({ status: 400, message: 'userType(유저 권한[user, admin, master])을 선택해주세요.' })
      if (!validType<'user' | 'admin' | 'master'>(usertype, ['admin', 'master', 'user'])) throw ({ status: 400, message: '올바른 유저 권한[user, admin, master]을 선택해주세요.' })
      if (user) throw ({ status: 401, message: '이미 존재하는 유저의 데이터 입니다.' })
    } catch (err: any) {
      return res.status(err.status).json({
        success: false,
        message: err.message
      })
    }

    try {
      const salt = getRandom('all', 32);
      await new Mongo().create(authModel, {
        username,
        password: hash(password + salt),
        salt,
        tel,
        name,
        usertype
      }).then((res) => {
        const fs = new fileSystem();
        fs.mkdir('/public/result/', res.username, 'Ignore')
        fs.mkdir('/public/tmp/', res.username, 'Ignore')
        fs.mkdir(`/public/tmp/${res.username}/`, 'tp', 'Ignore')
        fs.mkdir(`/public/tmp/${res.username}/`, 'mv', 'Ignore')
        fs.mkdir(`/public/tmp/${res.username}/`, 'cp', 'Ignore')
        fs.mkdir(`/public/tmp/${res.username}/`, 'rst', 'Ignore')
        fs.mkdir(`/public/tmp/${res.username}/`, 'ErrorFile', 'Ignore')
        fs.mkdir(`/public/tmp/${res.username}/`, 'undefinedModel', 'Ignore')
      })

      return res.status(201).json({
        success: true
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        message: '회원가입을 요청하는 도중 에러가 발생했습니다.'
      })
    }
  }
}
