'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPost(data);
    };

    if (session?.user.id) fetchData();
  }, [session]);
  const handleEdit = async (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (p) => {
    if (confirm('Are you sure you want to delete this form?')) {
      try {
        await fetch(`/api/prompt/${p._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = post.filter((po) => po._id !== p._id);
        setPost(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
