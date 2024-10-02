import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchAssets } from "../../services/assetsApi";
import type { ApiResponse } from "../../services/assetsApi/types";

interface AssetsContextProps {
  data?: InfiniteData<ApiResponse>;
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  handleSearch: (query: string, mediaType?: string) => void;
}

const AssetsContext = createContext<AssetsContextProps | undefined>(undefined);

interface AssetsProviderProps {
  children: ReactNode;
}

export const AssetsProvider: React.FC<AssetsProviderProps> = ({ children }) => {
  const [query, setQuery] = useState<string>("andromeda");
  const [mediaType, setMediaType] = useState<string>("image");
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ApiResponse>({
    queryKey: ["assets", query, mediaType],
    queryFn: ({ pageParam }) => {
      if (typeof pageParam !== "number")
        throw new Error("Invalid page parameter");
      return fetchAssets(query, mediaType, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.collection.items.length === 0) return undefined;
      return allPages.length + 1;
    },
    enabled: !!query, // Only fetch when there's a valid query
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const handleSearch = (newQuery: string, newMediaType: string = "image") => {
    setQuery(newQuery);
    setMediaType(newMediaType);
    queryClient.invalidateQueries({ queryKey: ["assets"] });
  };

  return (
    <AssetsContext.Provider
      value={{
        data,
        isLoading,
        error,
        hasNextPage: !!hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        handleSearch,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssets = (): AssetsContextProps => {
  const context = useContext(AssetsContext);

  if (context === undefined) {
    throw new Error("useAssets must be used within a AssetsProvider");
  }

  return context;
};
