//todo create class to extract tokens

export const tokenExtractorUtil = (req: Request): string | null => {
  const authorizationHeader =
    req.headers['authorization'] || req.headers['Authorization'];

  if (typeof authorizationHeader === 'string') {
    const [scheme, token] = authorizationHeader.split(' ');
    if (scheme === 'Bearer' && token) {
      return token;
    }
  }

  return null;
};

export const refreshTokenExtractorUtil = (req: Request): string | null => {
  const token = req.headers['refreshToken'] || req.headers['refreshtoken'];

  if (typeof token !== 'string') {
    return null;
  }

  return token;
};
