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
      .from<Product>('product');
  }

  getProduct(id: number) {
    return this.db
      .select('*')
      .from<Product>('product')
      .where({ id });
  }

  addProduct(product: Product) {
    return this.db.insert(product, '*').into<Product>('product');
  }
}