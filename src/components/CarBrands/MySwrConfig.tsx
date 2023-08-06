'use client'

import { render } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { SWRConfig, Cache } from 'swr';

import useSWR, { SWRResponse, Fetcher } from 'swr';
import { PublicConfiguration } from 'swr/_internal';

type Provider = { provider?: (cache: Readonly<Cache<any>>) => Cache<any> };

export function MySwrConfig({
    children,
    swrConfig,
}: {
    children?: ReactNode;
    // eslint-disable-next-line
    swrConfig?: Partial<PublicConfiguration<any, any, Fetcher<any>>> & Provider;
}) {
    return (
        <SWRConfig value={{ fetcher: customFetcher, ...swrConfig }}>
        {children}
        </SWRConfig>
    );
}

export async function customFetcher(url: string) {
    const res = await fetch(url);

    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
        const json = (await res.json()) as { message: string };
        throw new Error(json.message);
    }

    return res.json();
}

export function renderWithSWRConfig(
    ui: React.ReactElement,
    swrConfig?: Partial<PublicConfiguration<any, any, Fetcher<any>>> & Provider
) {
    return render(
        <SWRConfig value={{ fetcher: customFetcher, dedupingInterval: 0, provider: () => new Map(), ...swrConfig }}>
            {ui}
        </SWRConfig>
    )
}