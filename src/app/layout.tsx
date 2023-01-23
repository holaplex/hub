import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

import App from './app';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <App>{children}</App>
      </body>
    </html>
  );
}
