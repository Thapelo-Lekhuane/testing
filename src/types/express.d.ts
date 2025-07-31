import { ProfileResponseDto } from '../auth/dto/auth-response.dto';

declare module 'express-serve-static-core' {
  interface Request {
    user?: ProfileResponseDto;
  }
}
