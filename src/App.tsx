// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import ThemeColorPresets from './components/ThemeColorPresets';
import MotionLazyContainer from './components/animate/MotionLazyContainer';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import { ErrorBoundary } from 'react-error-boundary';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorFallBack from './components/customComponents/error/ErrorFallBack';
// ----------------------------------------------------------------------

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
<>
<ErrorFallBack error={error} resetErrorBoundary={resetErrorBoundary}/>
</>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          // reset the state of your app so the error doesn't happen again
        }}
      >
        <ThemeProvider>
          <ThemeColorPresets>
            <RtlLayout>
              <MotionLazyContainer>
                <ProgressBarStyle />
                <Settings />
                <ScrollToTop />
                <ToastContainer />
                <Router />
              </MotionLazyContainer>
            </RtlLayout>
          </ThemeColorPresets>
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}
