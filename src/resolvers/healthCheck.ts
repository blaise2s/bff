const healthCheckResolverMap = {
  Query: {
      ping: (
        _parent: any,
        _args: any,
        _context: any,
        _info: any
      ) => 'pong',
  },
};

export default healthCheckResolverMap;