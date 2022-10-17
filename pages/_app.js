import { ThemeProvider } from 'next-themes';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';

import { Navbar, Footer } from '../components';
import '../styles/globals.css';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="min-h-screen bg-white dark:bg-nft-dark">
      <Navbar />
      <div className="pt-65">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  </ThemeProvider>
);

export default MyApp;

/* Font awesome Available Fonts /node_modules/@fortawesome/free-solid-svg-icons/index.d.ts
 EX import:
   <FontAwesomeIcon
        icon={faSearch}
        style={{ fontSize: 100, color: "blue" }}
      />
 */
