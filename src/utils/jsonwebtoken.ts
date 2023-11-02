import { sign, verify } from 'jsonwebtoken';

interface UserToken {
  uuid: string
}

class jsonwebtoken {
  static sign(user: UserToken, secret: string) {
    const payload = {
      uuid: user.uuid
    };

    return sign(payload, secret, {
      expiresIn: '8h',
    });
  }

  static verify(token: string, secret: string) {
    try {
      const decode = verify(token, secret) as UserToken;

      return {
        success: true,
        message: '',
        uuid: decode.uuid
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

export default jsonwebtoken;