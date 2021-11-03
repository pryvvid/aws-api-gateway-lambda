import { All, Controller, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All()
  bff(@Req() req: Request, @Res() res: Response): Response | Promise<Response> {
    console.log('originalUrl', req.originalUrl);
    console.log('method', req.method);
    console.log('body', req.body);

    const [_, recipient] = req.url.split('/');
    console.log('recipient', recipient);

    const recipientUrl = process.env[recipient];
    console.log('recipientUrl', recipientUrl);

    if (recipientUrl) {
      return this.appService.handleResponseBff(req, res, recipientUrl);
    }

    return res.status(502).json({ error: 'Cannot process request' });
  }
}
