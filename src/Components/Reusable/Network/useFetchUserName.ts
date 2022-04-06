import { useCallback, useEffect, useState } from "react";
import { getAxios } from "src/Components/Reusable/Network/AxiosAllMethods";

export const useFetchUserName = (uid: string) => {
  const [state, setState] = useState<string>("Username");
  const fetchUserName = useCallback(async () => {
    const { username } = await getAxios<Props>(`users/${uid}`);
    setState((state) => username);
  }, [uid]);
  useEffect(() => {
    fetchUserName();
  }, [fetchUserName]);
  return state;
};
