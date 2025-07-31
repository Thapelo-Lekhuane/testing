import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

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

  };

  const mockProducts = [
    { ...mockProduct },
    { ...mockProduct, id: '2', name: 'Test Product 2' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            findAll: jest.fn().mockResolvedValue(mockProducts),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue(mockProduct),
            remove: jest.fn().mockResolvedValue(undefined),
            searchByName: jest.fn().mockResolvedValue(mockProducts),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createDto: CreateProductDto = {
        name: 'New Product',
        price: 50,
        quantity: 5,
        unitId: 'unit-1',
      };

      const result = await controller.create(createDto);
      
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await controller.findAll();
      
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('search', () => {
    it('should search products by name', async () => {
      const searchTerm = 'test';
      const result = await controller.search(searchTerm);
      
      expect(service.searchByName).toHaveBeenCalledWith(searchTerm);
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a single product', async () => {
      const id = '1';
      const result = await controller.findOne(id);
      
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const id = '1';
      const updateDto: UpdateProductDto = { name: 'Updated Name' };
      
      const result = await controller.update(id, updateDto);
      
      expect(service.update).toHaveBeenCalledWith(id, updateDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const id = '1';
      
      await controller.remove(id);
      
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
