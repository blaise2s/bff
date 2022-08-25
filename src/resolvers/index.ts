import merge from 'lodash.merge';

import healthCheckResolverMap from './healthCheck';
import userResolverMap from './user';
import peopleResolverMap from './people';
import productResolverMap from './product';

export const resolvers = merge(
  userResolverMap,
  healthCheckResolverMap,
  peopleResolverMap,
  productResolverMap
);
