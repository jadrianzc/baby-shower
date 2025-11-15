import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	experimental: {
		serverComponentsExternalPackages: ['knex', 'mssql'],
	},
	/* config options here */
};

export default nextConfig;
