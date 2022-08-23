import merge from 'lodash.merge';

import userResolverMap from './user';
import healthCheckResolverMap from './healthCheck';

export const resolvers = merge(userResolverMap, healthCheckResolverMap);
