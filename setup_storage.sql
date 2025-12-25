
-- Insert a new bucket called 'uploads'
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true) -- Marking public just in case, but we use signed URLs
on conflict (id) do nothing;

-- Policy to allow authenticated users to upload
create policy "Allow authenticated uploads"
on storage.objects for insert
to authenticated, anon
with check ( bucket_id = 'uploads' );

-- Policy to allow users to read their own uploads (or public read if needed)
create policy "Allow public read"
on storage.objects for select
to authenticated, anon
using ( bucket_id = 'uploads' );
