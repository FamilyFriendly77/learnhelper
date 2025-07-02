import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className='w-full h-full bg-black'>
      <div className='w-500 h-300 bg-[#EBEBEB] rounded-xl '>
        {Object.values(providers).map((provider) => (
          <button
            key={provider.name}
            onClick={() => signIn(provider.id)}
          >
            Sign In with {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: '/' } };
  }
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
