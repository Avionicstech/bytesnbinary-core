import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {promisify} from 'util';
import {AuthUser} from '../models';
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);
const decodeAsync = promisify(jwt.decode);
@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor() {}

  async verifyToken(token: string): Promise<AuthUser> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }

    let userProfile: AuthUser;

    try {
      const decodedToken = await verifyAsync(token, process.env.JWT_SECRET);

      userProfile = Object.assign({
        name: decodedToken.name,
        id: decodedToken.id,
        role: decodedToken.role,
        permissions: decodedToken.permissions,
        userTenantId: decodedToken.userTenantId,
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`,
      );
    }
    return userProfile;
  }

  async generateToken(userProfile: AuthUser): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null',
      );
    }
    const userInfoForToken = {
      id: userProfile.id,
      name: userProfile.name,
      role: userProfile.role,
      permissions: userProfile.permissions,
      userTenantId: userProfile.userTenantId,
    };
    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync(userInfoForToken, process.env.JWT_SECRET, {
        expiresIn: Number(process.env.JWT_EXPIRY),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }
    console.log(token);

    return token;
  }
  async decodeToken(token: string): Promise<unknown> {
    return decodeAsync(token);
  }
}
