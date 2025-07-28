import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseHealthService {
  private readonly logger = new Logger(DatabaseHealthService.name);

  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async isHealthy(): Promise<boolean> {
    try {
      // Test database connection
      await this.dataSource.query('SELECT 1');
      return true;
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      return false;
    }
  }

  async getStatus() {
    const isHealthy = await this.isHealthy();
    return {
      status: isHealthy ? 'up' : 'down',
      timestamp: new Date().toISOString(),
    };
  }
}
