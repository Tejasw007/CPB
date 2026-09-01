import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Code Paglu Bank',
    short_name: 'CPB',
    description: 'Core banking platform for customers and staff.',
    start_url: '/customer/login',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
