import { authOptions } from '../../../lib/authOptions'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { getProviders, signIn } from 'next-auth/react';
import '../../app/globals.css';
import { GithubIcon } from 'lucide-react';
import { useState } from 'react';

const Icons = new Map();

Icons.set('GitHub', <GithubIcon />);
Icons.set(
  'Google',
  <svg
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <path d='M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2 C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z'></path>
  </svg>
);

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
    <div className='w-screen h-screen bg-linear-to-tr from-[#00A1E0] to-[#0CAC64] bg-fixed flex items-center justify-center text-[#2A2F3C]'>
      <div className='w-128 h-128 bg-[#EBEBEB] rounded-4xl flex flex-col items-center p-6 shadow-2xl'>
        <h1 className='font-bold text-4xl mb-8 mt-2'>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        {isSignIn ? (
          <div className='flex flex-col w-full h-fit mb-6 justify-center items-center'>
            <form
              onSubmit={(e) => e.preventDefault()}
              className='flex flex-col justify-center items-center gap-2 mb-2'
            >
              <input
                className='border-2 p-2 rounded-2xl font-semibold'
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className='border-2 p-2 rounded-2xl font-semibold'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='submit'
                onClick={SubmitSignIn}
                className='py-2 px-4 text-[#EBEBEB] bg-[#FF1F1F] rounded-3xl font-semibold'
                value={'Sign In'}
              />
            </form>
            <button
              onClick={() => {
                setIsSignIn(false);
              }}
            >
              <span className='hover:border-b-1 p-0.5'>
                Dont have an account? Sign Up
              </span>
            </button>
          </div>
        ) : (
          <div className='flex flex-col w-full h-fit mb-6 justify-center items-center'>
            {' '}
            <form
              onSubmit={(e) => e.preventDefault()}
              className='flex flex-col justify-center items-center gap-2 mb-2'
            >
              <input
                className='border-2 p-2 rounded-2xl font-semibold'
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{' '}
              <input
                className='border-2 p-2 rounded-2xl font-semibold'
                type='text'
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className='border-2 p-2 rounded-2xl font-semibold'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type='submit'
                onClick={SubmitSignUp}
                className='py-2 px-4 text-[#EBEBEB] bg-[#FF1F1F] rounded-3xl font-semibold'
                value={'Sign Up'}
              />
            </form>
            <button
              onClick={() => {
                setIsSignIn(true);
              }}
            >
              <span className='hover:border-b-1 p-0.5'>
                Already have an account? Sign In
              </span>
            </button>
          </div>
        )}
        <div className='w-[90%] h-[2px] rounded-2xl bg-[#171A21] mb-4'></div>
        <div className='flex flex-col justify-center items-center gap-2'>
          {Object.values(providers).map((provider) => {
            if (provider.name != 'Credentials') {
              return (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='py-1 px-5 border-2 border-solid rounded-md flex flex-row gap-2 font-semibold'
                >
                  {Icons.get(provider.name)}
                  Continue with {provider.name}
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
