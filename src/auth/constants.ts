import { Res } from '@nestjs/common';
import { Response } from 'express';

export const jwtConstants = {
  secret: 'secretKey',
};

interface error {
  message: string
}

export class Error {
  async handler(@Res() res: Response, error: error) {
    return res.status(500).json({
      session: false,
      message: error.message ? error.message : error,
    });
  }
}
