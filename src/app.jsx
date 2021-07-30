import React, { useEffect, useState } from 'react';
import { Navigation } from './components/navigation/index.jsx';
import { Layout } from './page/index.jsx';

export default function App() {

    return (
        <>
            <Navigation />
            <Layout />
        </>
    )
}