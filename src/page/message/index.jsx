import React, { useState, useCallback, useRef } from 'react';

import { CardList } from './card-list'
import { Loader } from '../../components/loader/index.jsx';
import { useFetch } from '../../service/index.js';
import { MESSAGE_API } from '../../enums.js';

export default function MessagewithInfiniteScroll() {

    /** 
     * Fetching data on page load
     */
    const [pageId, setPageId] = useState(null);
    const { loading, error, messages, currentPageID, loadMore } = useFetch(MESSAGE_API, pageId);

    const observer = useRef(null);

    //Callback to track the scroll event at pageBottom
    const lastCardItemCB = useCallback((node) => {

        if (loading) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        //Observing changes in intersection of traget element and viewport
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && loadMore && !!currentPageID) {
                //if scroll at pagebottom, then fetch next set of messages
                setPageId(currentPageID);
            }
        })

        if (node) {
            observer.current.observe(node);
        }

    }, [loading, loadMore, currentPageID]);

    if (error) {
        return (
            <div>Error Fetching Data</div>
        );
    }

    return (

        <div>
            {
                loading && 
                <Loader></Loader>
            }
            {messages && messages.length > 0 && <CardList cards={messages} refCB={lastCardItemCB} />}
        </div>

    )
}


