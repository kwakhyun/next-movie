import ErrorMessage from '../components/error/ErrorPage';

function NotFound404() {
  return <ErrorMessage statusCode={404} message="Page Not Found" />;
}

export default NotFound404;
