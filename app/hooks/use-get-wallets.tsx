import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import http from '../_utils/http';
import { GetWalletsRequest } from '../@types/getWalletsRequest';
// import { GetFoldersResponse } from "../@types/get-folders-response";

export const GET_WALLETS_QUERY_KEY = 'Get data';

const getWallets = async (): Promise<GetWalletsRequest> => {
  const res = await http.get<GetWalletsRequest>('/valuable_wallets', {
    params: {
      network: 'eth',
      page: 1,
      limit: 50,
    },
  });
  return res.data;
};

export const useGetWallets = (
  options?: Partial<
    UseQueryOptions<unknown, AxiosError<any>, GetWalletsRequest, QueryKey>
  >
) => {
  return useQuery({
    queryKey: [GET_WALLETS_QUERY_KEY],
    queryFn: getWallets,
    retry: 3,
    staleTime: 1000 * 60,
    ...options,
  });
};
