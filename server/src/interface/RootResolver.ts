/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLResolveInfo } from 'graphql';

export interface Resolver {
  root: any;
  args: any;
  context: any;
  info: GraphQLResolveInfo;
}
