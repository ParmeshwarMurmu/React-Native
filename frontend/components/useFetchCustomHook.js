import { useEffect, useState } from "react";

const useFetchCustomHook = ({ api }) => {
  const [details, setDetails] = useState({
    data: {},
    isdataLoading: false,
    errorMessage: "",
  });

  const getData = async ({ signal }) => {
    try {
      setDetails((prev) => {
        return {
          ...prev,
          isdataLoading: true,
        };
      });
      const response = await fetch(api, { signal });
      const responseData = await response.json();
      setDetails((prev) => {
        return {
          ...prev,
          data: responseData,
        };
      });
    } catch (error) {
      console.log("ERROR", error);
      if (error.name === "AbortError") {
        return;
      }
      setDetails((prev) => {
        return {
          ...prev,
          errorMessage: error.message,
        };
      });
    } finally {
      setDetails((prev) => {
        return {
          ...prev,
          isdataLoading: false,
        };
      });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    getData({ signal: abortController.signal });
    return () => abortController.abort();
  }, [api]);

  return {
    data: details.data,
    isdataLoading: details.isdataLoading,
    errorMessage: details.errorMessage,
  };
};

export default useFetchCustomHook;
