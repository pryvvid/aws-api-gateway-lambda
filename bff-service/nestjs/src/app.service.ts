import { Injectable, Req, Res } from '@nestjs/common';
import axios, { Method } from 'axios';
import { shouldReturnCachedData } from './utils/shouldReturnCachedData';
import { Request, Response } from 'express';

let cachedProducts = null;

@Injectable()
export class AppService {
  async handleResponseBff(
    @Req() req: Request,
    @Res() res: Response,
    recipientUrl: string,
  ): Promise<Response> {
    // check if products list should be returned from cache
    if (req.originalUrl.substring(1) === 'products' && req.method === 'GET') {
      if (shouldReturnCachedData()) return res.status(200).json(cachedProducts);
    }

    const axiosConfig = {
      method: req.method as Method,
      url: `${recipientUrl}${req.originalUrl}`,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };

    console.log('axiosConfig:', axiosConfig);

    try {
      const response = await axios(axiosConfig);
      // make cache for products list
      if (req.originalUrl.substring(1) === 'products' && req.method === 'GET') {
        cachedProducts = response.data;
      }
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.log(JSON.stringify(error));

      if (error.response) {
        const { message } = error;
        const { status, statusText } = error.response;
        console.log('Status:', status);
        console.log('Message:', message);
        return res
          .status(status)
          .json({ message: statusText, errorMessage: message });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
