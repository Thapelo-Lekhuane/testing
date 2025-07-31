import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../src/products/entities/product.entity';
import { ProductsService } from '../../src/products/services/products.service';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import { UpdateProductDto } from '../../src/products/dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 100,
    quantity: 10,
    sku: 'TEST123',
    unitId: 'unit-1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  };

  const mockProducts = [
    { ...mockProduct },
    { ...mockProduct, id: '2', name: 'Test Product 2' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn().mockImplementation(dto => ({
              ...dto,
              id: '1',
              createdAt: new Date(),
              updatedAt: new Date(),
            })),
            save: jest.fn().mockImplementation(product => Promise.resolve(product)),
            find: jest.fn().mockResolvedValue(mockProducts),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            softDelete: jest.fn().mockResolvedValue({ affected: 1 }),
            createQueryBuilder: jest.fn(() => ({
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue(mockProducts),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product with default isActive', async () => {
      const createDto: CreateProductDto = {
        name: 'New Product',
        price: 50,
        quantity: 5,
        unitId: 'unit-1',
      };

      const result = await service.create(createDto);
      
      expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({
        ...createDto,
        isActive: true,
      }));
      expect(repository.save).toHaveBeenCalled();
      expect(result).toHaveProperty('id');
    });
  });

  describe('findAll', () => {
    it('should return an array of active products', async () => {
      const result = await service.findAll();
      
      expect(repository.find).toHaveBeenCalledWith({
        where: { isActive: true },
        order: { name: 'ASC' },
      });
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const id = '1';
      const result = await service.findOne(id);
      
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual(mockProduct);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);
      
      await expect(service.findOne('999')).rejects.toThrow('Product with ID "999" not found');
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto: UpdateProductDto = { name: 'Updated Name' };
      const id = '1';
      
      await service.update(id, updateDto);
      
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        ...mockProduct,
        ...updateDto,
      }));
    });

    it('should handle quantity updates correctly', async () => {
      const updateDto: UpdateProductDto = { quantityToAdd: 5 };
      const id = '1';
      
      await service.update(id, updateDto);
      
      expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
        quantity: mockProduct.quantity + 5,
      }));
    });
  });

  describe('remove', () => {
    it('should soft delete a product', async () => {
      const id = '1';
      
      await service.remove(id);
      
      expect(repository.softDelete).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if product not found', async () => {
      jest.spyOn(repository, 'softDelete').mockResolvedValueOnce({ affected: 0 } as any);
      
      await expect(service.remove('999')).rejects.toThrow('Product with ID "999" not found');
    });
  });

  describe('searchByName', () => {
    it('should search products by name (case-insensitive)', async () => {
      const searchTerm = 'test';
      
      const result = await service.searchByName(searchTerm);
      
      expect(repository.createQueryBuilder).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });
});
