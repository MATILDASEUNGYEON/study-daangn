'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../lib/store';
import { HeaderImpl } from '@/components/header';
import { FooterImpl } from '@/components/footer';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <HeaderImpl />
                            {children}
                            <FooterImpl />
                        </div>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}
