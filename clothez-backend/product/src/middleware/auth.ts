import { UserRoleType, UserTokenPayload } from './../types/auth';
import { Secret, verify } from 'jsonwebtoken';
import { AuthorizeError } from './../error/error-type/AuthorizedError';
import { Request, Response, NextFunction } from 'express';

export const verifyAdminAuthorization = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    try {
        const decodedToken = decodeTokenInRequest(req);
        if (decodedToken.role !== UserRoleType.ADMIN) {
            throw new AuthorizeError(
                'You are not authorized to access this route'
            );
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const verifyUserAuthentication = async (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    try {
        const decodedToken = decodeTokenInRequest(req);
        if (decodedToken.userId !== req.params.id) {
            throw new AuthorizeError(
                'You are not authorized to access this route'
            );
        }
        next();
    } catch (error) {
        next(error);
    }
};

export const decodeTokenInRequest = (req: Request): UserTokenPayload => {
    // authHeader here is "Bearer accessToken"
    const [, accessToken] = req.header('Authorization')?.split(' ') || [];

    if (!accessToken) {
        throw new AuthorizeError('Access token is required');
    }
    const decodedToken = verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET as Secret
    ) as UserTokenPayload;
    return decodedToken;
};
