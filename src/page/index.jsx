import React from 'react';
import  MessagewithInfiniteScroll from './message/index.jsx';
import { ErrorBoundary } from '../components/error';

export class Layout extends React.Component {

    render() {
        return (
            <ErrorBoundary>
                <main className="main" role="main">
                    <div className="container">
                       <MessagewithInfiniteScroll/>
                    </div>
                </main>
            </ErrorBoundary>
        )
    }
}



