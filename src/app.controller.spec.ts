import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseHealthService } from './common/health/database-health.service';

describe('AppController', () => {
  let appController: AppController;
  let mockDatabaseHealthService: jest.Mocked<DatabaseHealthService>;

  beforeEach(async () => {
    const mockHealthService = {
      getStatus: jest.fn().mockResolvedValue({
        status: 'up',
        timestamp: new Date().toISOString(),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: DatabaseHealthService,
          useValue: mockHealthService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    mockDatabaseHealthService = app.get(DatabaseHealthService);
  });

  describe('getHello', () => {
    it('should return welcome message with version and timestamp', () => {
      const result = appController.getHello();

      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('version');
      expect(result).toHaveProperty('timestamp');
      expect(result.message).toBe('Welcome to the Uventory API');
      expect(result.version).toBe('1.0.0');
      expect(typeof result.timestamp).toBe('string');
      expect(new Date(result.timestamp).getTime()).not.toBeNaN();
    });
  });

  describe('getHealth', () => {
    it('should return health status with timestamp and uptime', async () => {
      const result = await appController.getHealth();

      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('uptime');
      expect(result).toHaveProperty('database');
      expect(result.status).toBe('ok');
      expect(typeof result.timestamp).toBe('string');
      expect(typeof result.uptime).toBe('number');
      expect(new Date(result.timestamp).getTime()).not.toBeNaN();
      expect(result.uptime).toBeGreaterThan(0);
      expect(result.database).toHaveProperty('status');
      expect(result.database).toHaveProperty('timestamp');

      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(mockDatabaseHealthService.getStatus).toHaveBeenCalled();
    });
  });
});
