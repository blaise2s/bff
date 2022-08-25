import merge from 'lodash.merge';

import healthCheckResolverMap from './healthCheck';
import userResolverMap from './user';
import peopleResolverMap from './people';

export const resolvers = merge(userResolverMap, healthCheckResolverMap, peopleResolverMap);
