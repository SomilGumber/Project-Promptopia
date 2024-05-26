'use client';

import Profile from '@components/Profile';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }

    if (params.id) fetchPosts();
  }, []);
  return (
    <Profile
      name={`${name}`}
      desc={`Welcome to your ${name}'spersonalized profile page. Explore ${name}'s exceptional prompts and be insipred by the power of their imagination.`}
      data={posts}
    />
  );
};

export default UserProfile;
