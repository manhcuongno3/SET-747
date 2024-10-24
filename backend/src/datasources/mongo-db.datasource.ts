import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongoDB',
  connector: 'mongodb',
  url: 'mongodb+srv://manhcuongno3:YXN9MFBGBV6soGWF@todo.41wyy.mongodb.net/?retryWrites=true&w=majority&appName=todo',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: 'todo',
  useNewUrlParser: true
};

@lifeCycleObserver('datasource')
export class MongoDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoDB';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoDB', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
