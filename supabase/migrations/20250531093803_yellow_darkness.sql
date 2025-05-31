-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table
create table users (
  id uuid default uuid_generate_v4() primary key,
  email varchar unique not null,
  password varchar not null,
  name varchar not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table
create table orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  status varchar not null,
  total_amount decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create measurements table
create table measurements (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references users(id),
  measurement_type varchar not null,
  value decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table users enable row level security;
alter table orders enable row level security;
alter table measurements enable row level security;

-- Create policies
create policy "Users can view their own data" on users
  for select using (auth.uid() = id);

create policy "Users can update their own data" on users
  for update using (auth.uid() = id);

create policy "Users can view their own orders" on orders
  for select using (auth.uid() = user_id);

create policy "Users can view their own measurements" on measurements
  for select using (auth.uid() = user_id);