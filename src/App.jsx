import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import {Posts} from './Components/Posts/Posts';
import {Pagination} from './Components/Pagination/Pagination';

function App() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(10);
	
	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const API_URL = `https://jsonplaceholder.typicode.com/posts`;
			const response = await axios.get(API_URL);
			setPosts(response.data);
			setLoading(false);
		};
		
		fetchPosts();
	}, []);
	
	// Get current Posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	
	// Change Page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	
	console.log(posts);
	return (
		<div className='App'>
			<h1 className='text-primary mb-3'>My Blog</h1>
			<Posts posts={currentPosts} loading={loading} />
			<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
		</div>
	);
}

export default App;
