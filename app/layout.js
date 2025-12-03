import './globals.css';
import './fanta.css';
import Head from './Head';
import Link from 'next/link';
import GoTo from '@/components/GoTo';
import AuthProvider from '@/context/AuthContext';

export const metadata = {
  title: 'Subsy | The Subscription Tracker',
  description: 'Track all your subscription analytics!',
};

export default function RootLayout({ children }) {
  const header = (
    <header>
      <div>
        <Link href={'/'}>
          <h1 className="text-gradient">Subsy</h1>
        </Link>
        <p>The Subscription Tracker</p>
      </div>
      <GoTo />
    </header>
  );

  const footer = (
    <footer>
      <div className="hard-line" />
      <div className="footer-content">
        <div>
          <div>
            <h4>Subsy</h4>
            <p>|</p>
            <button disabled>Install app</button>
          </div>
          <p className="copyright">
            © Copyright 2026 KellyBytes
            <br />
            All rights reserved.
          </p>
        </div>
        <div>
          <p>
            Facing issues?{' '}
            <a href="https://forms.gle/sMaBpbDSnP7oD1aL7" target="_blank">
              Get help
            </a>
          </p>
          <p>
            Suggestions for improvement?{' '}
            <a href="https://forms.gle/rhsFW8nnXo8XMYBN7" target="_blank">
              Share feedback
            </a>
          </p>
          <div>
            <Link href={'/privacy'}>Privacy Policy</Link>
            <Link href={'/tos'}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );

  return (
    <html lang="en">
      <Head />
      <AuthProvider>
        <body>
          {header}
          <div className="full-line" />
          <main>{children}</main>
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
