import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { UsersService } from '../../users/users.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);
  const logger = new Logger('Seed');

  try {
    logger.log('🌱 Starting database seeding...');

    // Create admin user
    const adminUser = await usersService.create(
      'admin@uventory.com',
      'admin123',
      'Admin',
      'User',
    );

    logger.log(`✅ Created admin user: ${adminUser.email}`);

    // Create test user
    const testUser = await usersService.create(
      'test@uventory.com',
      'test123',
      'Test',
      'User',
    );

    logger.log(`✅ Created test user: ${testUser.email}`);

    logger.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    logger.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    await app.close();
  }
}

// Run the seed function
seed()
  .then(() => {
    console.log('✅ Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });
