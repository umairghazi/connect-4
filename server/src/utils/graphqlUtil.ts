/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLResolveInfo } from 'graphql';
import { Resolver } from '../interface';

export const resolveObj = async (
  root: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo,
): Promise<Resolver> => {
  return Promise.resolve({ root, args, context, info });
};
