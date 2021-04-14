import '../styles/globals.css';
import { Provider } from 'react-redux';

import withReduxSaga from 'next-redux-saga';
import store, { wrapperRedux } from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {pageProps}
};

export default wrapperRedux(withReduxSaga(MyApp));
