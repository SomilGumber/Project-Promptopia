'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPost(data);
    };

    fetchData();
  }, []);

  const filterPosts = (searchName) => {
    const regex = new RegExp(searchName, 'i');

    return post.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // Debounce method
    setSearchTimeout(
      setTimeout(() => {
        const serachResult = filterPosts(searchText);
        setSearchedResults(serachResult);
      }, 500)
    );
  };
  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResults = filterPosts(tag);
    setSearchedResults(searchResults);
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList
          data={post}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  );
};

export default Feed;
