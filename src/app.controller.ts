import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { DatabaseHealthService } from './common/health/database-health.service';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseHealthService: DatabaseHealthService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get welcome message',
    description: 'Returns a welcome message for the Uventory API',
  })
  @ApiResponse({
    status: 200,
    description: 'Welcome message',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Welcome to the Uventory API',
        },
        version: {
          type: 'string',
          example: '1.0.0',
        },
        timestamp: {
          type: 'string',
          example: '2024-01-01T00:00:00.000Z',
        },
      },
    },
  })
  getHello(): { message: string; version: string; timestamp: string } {
    return {
      message: this.appService.getHello(),
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('health')
  @ApiOperation({
    summary: 'Health check',
    description:
      'Returns the health status of the application and its dependencies',
  })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'ok',
        },
        timestamp: {
          type: 'string',
          example: '2024-01-01T00:00:00.000Z',
        },
        uptime: {
          type: 'number',
          example: 123.456,
        },
        database: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'up',
            },
            timestamp: {
              type: 'string',
              example: '2024-01-01T00:00:00.000Z',
            },
          },
        },
      },
    },
  })
  async getHealth(): Promise<{
    status: string;
    timestamp: string;
    uptime: number;
    database: { status: string; timestamp: string };
  }> {
    const databaseStatus = await this.databaseHealthService.getStatus();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: databaseStatus,
    };
  }
}
