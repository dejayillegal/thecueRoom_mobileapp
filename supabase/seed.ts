import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL!;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(url, key);

async function run() {
  await supabase.from('users').insert([
    { email: 'admin@thecue.room', display_name: 'Admin' },
    { email: 'artist1@thecue.room', display_name: 'Artist One' },
    { email: 'artist2@thecue.room', display_name: 'Artist Two' }
  ]);

  const { data: venues } = await supabase
    .from('venues')
    .insert([
      { name: 'Bangalore Club', city: 'Bangalore', country: 'India' },
      { name: 'Berghain', city: 'Berlin', country: 'Germany' },
      { name: 'Mehboob Studios', city: 'Mumbai', country: 'India' }
    ])
    .select('id');

  if (!venues) throw new Error('Venue insert failed');
  const [bang, berl, mum] = venues;

  await supabase.from('gigs').insert([
    { venue_id: bang.id, title: 'Bangalore Nights', start_time: new Date(), end_time: new Date() },
    { venue_id: berl.id, title: 'Berlin Beats', start_time: new Date(), end_time: new Date() },
    { venue_id: mum.id, title: 'Mumbai Madness', start_time: new Date(), end_time: new Date() }
  ]);

  const { data: users } = await supabase.from('users').select('id');
  const adminId = users?.[0].id;

  await supabase.from('posts').insert([
    { user_id: adminId, content: 'Welcome to thecueRoom!' },
    { user_id: adminId, content: 'Second post with lime vibes' }
  ]);

  await supabase.from('featureFlags').insert([{ key: 'all', enabled: true }]);

  console.log('Seed complete');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
