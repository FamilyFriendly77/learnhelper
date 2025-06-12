import Card from './(components)/Card';
import WelcomeCard from './(components)/WelcomeCard';

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center '>
      <WelcomeCard />
      <button>Start Learning now!</button>
      <div>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
    </div>
  );
}
