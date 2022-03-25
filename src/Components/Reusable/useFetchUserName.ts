import { useCallback, useEffect, useState } from "react";
import { FetchAxios } from "src/Components/Posts/FetchGeneric";
import { Props } from "src/Components/Users/UserTypes";

export const useFetchUserName = (uid: string | undefined) => {
  const [state, setState] = useState<string>("Username");
  const fetchUserName = useCallback(async () => {
    const { username } = await FetchAxios<Props>(`https://jsonplaceholder.typicode.com/users/${uid}`);
    setState((state) => username);
  }, [uid]);
  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);
  return state;
};
