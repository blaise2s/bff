import { SQLDataSource } from 'datasource-sql';

export interface Product {
  id: number;
  name: string;
  description?: string;
}

export class PostgresDb extends SQLDataSource {
  getProducts() {
    return this.db
      .select('*')
      .from('product');
  }

  getProduct(id: number) {
    // TODO: Why does this not work?
    return this.db
      .select('*')
      .from('product')
      .where({ id });
  }
}