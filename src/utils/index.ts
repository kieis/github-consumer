import { Dispatch, SetStateAction } from "react";

type FetchDataParams = {
  url: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<any>>;
  reOrderData?: (data: any) => {} | undefined;
  handleError: () => {};
};

export const fetchData = async ({
  url,
  setIsLoading,
  setData,
  reOrderData,
  handleError,
}: FetchDataParams) => {
  setIsLoading(true);

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (reOrderData) {
      setData({
        ...data,
        data: reOrderData(data?.data)
      });
    } else {
      setData(data);
    }
  } catch (err) {
    handleError();
  }

  setTimeout(() => {
    setIsLoading(false);
  }, 100);
};

export const formatDate = (date: string, format?: Intl.DateTimeFormatOptions) =>
  Intl.DateTimeFormat("en-US", {
    ...format,
  }).format(new Date(date));
