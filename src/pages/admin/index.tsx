import { verifyToken } from '@/utils/verifyToken';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['admin-token']; // or read from header/localStorage workaround
  const data = token ? verifyToken(token) : null;

  // Ensure data is an object and has a 'role' property
  if (
    !data ||
    typeof data !== 'object' ||
    data === null ||
    !('role' in data) ||
    (data as any).role !== 'admin'
  ) {
    return {
      redirect: {
        destination: '/adminlogin',
        permanent: false,
      },
    };
  }

  return { props: { adminData: data } };
};
