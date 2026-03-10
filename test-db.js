const { Client } = require("pg");

const testConnection = async (url, name) => {
  console.log(`Testing ${name}...`);
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query("SELECT NOW()");
    console.log(`${name} SUCCESS:`, res.rows[0].now);
  } catch (err) {
    console.error(`${name} ERROR:`, err.message);
  } finally {
    await client.end();
  }
};

const run = async () => {
  const poolerUrl = "postgresql://postgres.ttwgpzgrkpqiywltkedu:Satvil%401311@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
  const directUrl = "postgresql://postgres.ttwgpzgrkpqiywltkedu:Satvil%401311@aws-0-ap-south-1.pooler.supabase.com:5432/postgres";
  const oldDirectUrl = "postgresql://postgres:Satvil%401311@db.ttwgpzgrkpqiywltkedu.supabase.co:5432/postgres";
  
  await testConnection(poolerUrl, "Pooler Port 6543");
  await testConnection(directUrl, "Pooler Port 5432");
  await testConnection(oldDirectUrl, "Old Direct URL");
};

run();
