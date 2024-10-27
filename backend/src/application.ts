import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import path from 'path';
import {JWTStrategy} from './authentication-strategies/jwt-strategy';
import {MongoDbDataSource} from './datasources';
import {MySequence} from './sequence';
import {UserService} from './services';
import {JWTService} from './services/jwt-service';

export {ApplicationConfig};

export class BackendApplication extends BootMixin(
  RepositoryMixin(RestApplication),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Set up authentication components
    this.component(AuthenticationComponent);
    this.service(JWTService);
    this.service(UserService);
    registerAuthenticationStrategy(this, JWTStrategy);

    // Bind the MongoDB datasource
    this.dataSource(MongoDbDataSource);

    this.projectRoot = __dirname;
    // Customize Booter Conventions here
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
