import { QueryKey, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import http from '../_utils/http';
import { GetWalletsRequest } from '../@types/getWalletsRequest';
import { useParams } from 'next/navigation';
// import { GetFoldersResponse } from "../@types/get-folders-response";

export const GET_WALLETS_QUERY_KEY = 'Get data';

const getWalletSummary = async (id: string): Promise<any> => {
  const res = await http.get<any>(`/walletsummary/${id}`, {
    params: {
      network: 'eth',
    },
  });
  return res.data;
};

export const useGetWalletSummary = (
  options?: Partial<UseQueryOptions<unknown, AxiosError<any>, any, QueryKey>>
) => {
  const id: string = useParams().id as string;
  console.log(id);
  return useQuery({
    queryKey: [GET_WALLETS_QUERY_KEY],
    queryFn: () => getWalletSummary(id),
    retry: 3,
    staleTime: 1000 * 60,
    ...options,
  });
};
