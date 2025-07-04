import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import '../../app/globals.css';
import { GithubIcon } from 'lucide-react';
import { useState } from 'react';

const Icons = new Map();

Icons.set('GitHub', <GithubIcon />);

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const SubmitSignUp = async () => {
    console.log('signup');
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email: email, password: password, name: name }),
    });
    console.log(response);
  };
  const SubmitSignIn = async () => {
    await signIn('credentials', {
      email: email,
      password: password,
    });
  };
  return (
    <div className='w-screen h-screen bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] bg-fixed'>
      <div className='w-128 h-160 bg-[#EBEBEB] rounded-4xl flex flex-col items-center p-6'>
        <h1 className='font-bold text-3xl'>Sign In</h1>
        {isSignIn ? (
          <div className='flex flex-col w-full h-fit'>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='submit'
                onClick={SubmitSignIn}
              />
            </form>
            <span>
              Dont have an account?{' '}
              <button
                onClick={() => {
                  setIsSignIn(false);
                }}
              >
                Sign In
              </button>
            </span>
          </div>
        ) : (
          <div>
            {' '}
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{' '}
              <input
                type='text'
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='submit'
                onClick={SubmitSignUp}
              />
            </form>
          </div>
        )}
        <div>
          {Object.values(providers).map((provider) => {
            if (provider.name != 'Credentials') {
              return (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='py-1 px-5 border-2 border-solid rounded-md flex flex-row gap-2'
                >
                  {Icons.get(provider.name)}
                  Sign In with {provider.name}
                </button>
              );
            }
          })}
        </div>
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
