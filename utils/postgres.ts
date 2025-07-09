import postgres from 'postgres';
export default async function getData() {
  const sql = postgres(process.env.DATABASE_URL || '', { ssl: 'require' });
  const response = await sql`SELECT * FROM public."Skills"`;
  console.log(response[0]);
  return response[0];
}
