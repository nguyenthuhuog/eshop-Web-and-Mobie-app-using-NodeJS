// src/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/searchbar.css';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm}`);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
};

export default SearchBar;  // Make sure the export is correct here
