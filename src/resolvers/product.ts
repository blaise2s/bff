import { DataSources, Product } from '../datasources';

const productResolverMap = {
  Query: {
    products: async (
      _parent: any,
      _args: any,
      { dataSources }: { dataSources: DataSources },
      _info: any
    ) => dataSources.postgresDb.getProducts(),
    product: async (
      _parent: any,
      { id }: { id: number },
      { dataSources }: { dataSources: DataSources },
      _info: any
    ) => dataSources.postgresDb.getProduct(id),
  },
  Mutation: {
    addProduct: async (
      _parent: any,
      args: { id: number, name: string, description?: string },
      { dataSources }: { dataSources: DataSources },
      _info: any
    ) => {
      const { id, name, description } = args;
      const newProduct: Product = { id, name, description };
      return dataSources.postgresDb.addProduct(newProduct);
    },
  },
};

export default productResolverMap;