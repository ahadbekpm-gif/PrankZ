-- Create a table for public profiles using Supabase's auth.users
create table public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  credits integer default 1,
  plan text default 'free',
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone." 
  on public.profiles for select 
  using (true);

create policy "Users can insert their own profile." 
  on public.profiles for insert 
  with check (auth.uid() = id);

create policy "Users can update own profile." 
  on public.profiles for update 
  using (auth.uid() = id);


-- Create a table for subscriptions
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  paddle_subscription_id text,
  plan text,
  status text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for subscriptions
alter table public.subscriptions enable row level security;

-- Create policies for subscriptions
create policy "Users can view own subscriptions." 
  on public.subscriptions for select 
  using (auth.uid() = user_id);


-- Create a function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
