// app/AntdConfig.tsx
'use client';

import '@ant-design/v5-patch-for-react-19';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import React from 'react';
import { ConfigProvider } from 'antd';

export default function AntdConfig({ children }: { children: React.ReactNode }) {
	return (
		<AntdRegistry>
			{' '}
			<ConfigProvider
				theme={{
					token: {
						// Seed Token
						colorPrimary: '#5672a6',
						borderRadius: 2,
						fontFamily: "'Bree Serif', serif",
					},
				}}>
				{children}
			</ConfigProvider>
		</AntdRegistry>
	);
}
