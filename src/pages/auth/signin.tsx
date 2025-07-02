import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import '../../app/globals.css';
import { GithubIcon } from 'lucide-react';

const Icons = new Map();

Icons.set('GitHub', <GithubIcon />);

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <body className='w-screen h-screen bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] bg-fixed'>
      <div className='w-128 h-160 bg-[#EBEBEB] rounded-4xl flex flex-col items-center p-6'>
        <h1 className='font-bold text-3xl'>Sign In</h1>
        <div>
          {Object.values(providers).map((provider) => (
            <button
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='py-1 px-5 border-2 border-solid rounded-md flex flex-row gap-2'
            >
              {Icons.get(provider.name)}
              Sign In with {provider.name}
            </button>
          ))}
        </div>
      </div>
    </body>
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
