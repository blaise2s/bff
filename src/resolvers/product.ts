import { DataSources } from '../datasources';

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
};

export default productResolverMap;