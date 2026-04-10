import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './config/configuration';

import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { ProductStocksModule } from './modules/product-stocks/product-stocks.module';
import { ProvincesModule } from './modules/provinces/provinces.module';
import { CitysModule } from './modules/cities/cities.module';
import { OrdersModule } from './modules/orders/orders.module';
import { OrderItemsModule } from './modules/order-items/order-items.module';
import { OrderShippingsModule } from './modules/order-shippings/order-shippings.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { PostalCodesModule } from './modules/postal-codes/postal-codes.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';
import { PaymentStatusesModule } from './modules/payment-statuses/payment-statuses.module';
import { OrderStatusesModule } from './modules/order-statuses/order-statuses.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../.env', '.env'],
      load: [configuration],
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
    ProductStocksModule,
    ProvincesModule,
    CitysModule,
    OrdersModule,
    OrderItemsModule,
    OrderShippingsModule,
    PaymentsModule,
    ReviewsModule,
    AddressesModule,
    PostalCodesModule,
    PaymentMethodsModule,
    PaymentStatusesModule,
    OrderStatusesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
