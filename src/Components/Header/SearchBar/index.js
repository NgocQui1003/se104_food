import React from 'react'

import styles from './SearchBar.module.scss';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchBar( {search, setSearch, handleSearch} ) {
    return (
        <div className={styles['search-bar']}>
            <input placeholder="Tên món, nguyên liệu, chủ đề ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
            />
            <div className={styles['icon-search']}
                onClick={handleSearch}
            >
                <SearchRoundedIcon sx={{ color: '#ffffff' }} />
            </div>
        </div>
    )
}

export default SearchBar
