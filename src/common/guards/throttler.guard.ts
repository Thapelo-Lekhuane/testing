import { Injectable, HttpException, HttpStatus, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected override async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail
  ): Promise<void> {
    throw new HttpException(
      {
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
        message: 'Too many requests',
        error: 'Too Many Requests',
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }

  protected override async getTracker(req: Record<string, any>): Promise<string> {
    const ips = req.ips as string[] | undefined;
    const ip = req.ip as string | undefined;
    if (ips && ips.length > 0 && typeof ips[0] === 'string') {
      return ips[0];
    }
    return ip ?? '';
  }
}
