import { useEffect, useState, useCallback } from "react";

/**
 * Hook to fetch Messages by pageToken
 * @param {string} path 
 * @param {string} pageId 
 * @returns {object} appState
 */
export function useFetch(path, pageId) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentPageID, setCurrentPageID] = useState(null);
    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        fetchData(path, pageId);
    }, [pageId, path]);


    const fetchData = useCallback(async () => {

        setLoading(true);
        setError(false);

        try {
            let url = !!pageId ? `${path}?pageToken=${pageId}` : path;
            await fetch(url)
                .then((response) => response.json())
                .then((response) => {
                    setLoading(false);
                    setMessages((prevMessages)=> {
                        return [...[...prevMessages, ...response.messages]];
                    });
                    setLoadMore(!!response.pageToken);
                    setCurrentPageID(response.pageToken);
                });
        } catch (e) {
            setError(true);
        }
    }, [pageId, path]);

    return { 
        messages,
        currentPageID,
        error,
        loading,
        loadMore
     };
}
