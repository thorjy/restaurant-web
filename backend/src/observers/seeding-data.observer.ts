import {
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CustomerRepository, MenuRepository} from '../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class SeedingDataObserver implements LifeCycleObserver {
  /*
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}
  */
  constructor(
    @repository('CustomerRepository')
    public customerRepository: CustomerRepository,
    @repository('MenuRepository')
    public menuRepository: MenuRepository,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */

  customer1 = {
    username: 'test',
    password: 'password',
  };

  customer2 = {
    username: 'bot',
    password: 'password',
  };

  menu = [
    {
      price: 5,
      dishName: 'Chicken Rice',
      description: 'Fragrant Rice with one of the finest chickens!',
    },
    {
      price: 8,
      dishName: 'Braised Pork Belly',
      description: 'Fresh pork belly braised in signature sauce for 15 hours!!',
    },
    {
      price: 12,
      dishName: 'Prawn Omelette',
      description: 'Egg.....!',
    },
    {
      price: 12,
      dishName: 'Fresh Oysters',
      description:
        'Oysters that are caught from our very own sea in Singapore!!',
    },
    {
      price: 7,
      dishName: 'Fried Tofu',
      description: 'Tofu fried in coconut oil, one of my favourites.!',
    },
    {
      price: 3,
      dishName: 'Iced Milo',
      description: 'My favourite drink...!',
    },
    {
      price: 1,
      dishName: 'White Rice',
      description: 'Just a normal bowl of rice!',
    },
  ];

  async start(): Promise<void> {
    console.log('Please hold on while I seed in data.....');

    // Check if the data already exists before creating it
    const existingCustomer1 = await this.customerRepository.findOne({
      where: {username: this.customer1.username},
    });
    const existingCustomer2 = await this.customerRepository.findOne({
      where: {username: this.customer2.username},
    });

    if (!existingCustomer1) {
      await this.customerRepository.create(this.customer1);
    } else {
    }

    if (!existingCustomer2) {
      await this.customerRepository.create(this.customer2);
    } else {
    }

    for (const dish of this.menu) {
      const result = await this.menuRepository.findOne({
        where: {dishName: dish.dishName},
      });
      if (!result) {
        await this.menuRepository.create(dish);
      }
    }

    console.log('Seeding completed!');
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
