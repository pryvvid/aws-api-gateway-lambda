import { Injectable, Req, Res, HttpService } from '@nestjs/common';
import { Method, AxiosRequestConfig } from 'axios';
import { shouldReturnCachedData } from './utils/shouldReturnCachedData';
import { Request, Response } from 'express';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  private cachedProducts = null;
  private cachedStatus = null;

  async handleResponseBff(
    @Req() req: Request,
    @Res() res: Response,
    recipientUrl: string,
  ): Promise<Response> {
    // check if products list should be returned from cache
    if (req.originalUrl.substring(1) === 'products' && req.method === 'GET') {
      if (shouldReturnCachedData())
        return res.status(this.cachedStatus).json(this.cachedProducts);
    }

    const axiosConfig: AxiosRequestConfig = {
      method: req.method as Method,
      url: `${recipientUrl}${req.originalUrl}`,
      ...(Object.keys(req.body || {}).length > 0 && { data: req.body }),
    };

    console.log('axiosConfig:', axiosConfig);

    try {
      const response = await this.httpService.axiosRef(axiosConfig);
      // make cache for products list
      if (req.originalUrl.substring(1) === 'products' && req.method === 'GET') {
        this.cachedProducts = response.data;
        this.cachedStatus = response.status;
      }
      return res.status(response.status).json(response.data);
    } catch (error) {
      console.log(JSON.stringify(error));

      if (error.response) {
        const { status, statusText } = error.response;
        console.log('Status:', status);
        console.log('Message:', statusText);
        return res.status(status).json({ message: statusText });
      } else {
        return res.status(500).json({ error: error.message });
      }
    }
  }
}
