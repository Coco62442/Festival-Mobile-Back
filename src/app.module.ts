import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AffectationModule } from './Affectation/affectation.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BenevoleModule } from './Benevole/benevole.module';
import { CreneauModule } from './Creneau/creneau.module';
import { FestivalModule } from './Festival/festival.module';
import { JourModule } from './Jour/jour.module';
import { ZoneModule } from './Zone/zone.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './Authentification/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.user}:${process.env.mdp}@festivalcluster.iv7ihff.mongodb.net/FestivalMobile?retryWrites=true&w=majority`,
    ),
    FestivalModule,
    BenevoleModule,
    AffectationModule,
    CreneauModule,
    JourModule,
    ZoneModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
