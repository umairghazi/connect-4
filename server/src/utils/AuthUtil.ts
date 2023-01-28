import { Request, Response } from 'express';
import { get } from 'lodash';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

export const AuthUtil = {
  getToken(req: Request): string {
    return get(req, 'headers.authorization', '').split(' ')[0];
  },

  // async checkAuth0Jwt(req: Request, res: Response): boolean {
  // return jwt({
  //   secret: jwksRsa.expressJwtSecret({
  //     cache: true,
  //     rateLimit: true,
  //     jwksRequestsPerMinute: 5,
  //     jwksUri: `https://blog-samples.auth0.com/.well-known/jwks.json`
  //   }),

  //   // Validate the audience and the issuer.
  //   audience: 'https://ads-api',
  //   issuer: `https://blog-samples.auth0.com/`,
  //   algorithms: ['RS256']
  // });
  // }
};
