import React, { useState, useEffect } from 'react';
import { movies$ } from '../movies';
import ShowMovies from "./ShowMovies";
import Pagination from "./Pagination";


const Movies = () => {
    const [posts, setPosts] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState([]);
    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [loadOnce, setLoadOnce] = useState(true);
    const [deleteOnce, setDeleteOne] = useState(false);

    const radios = ["4", "8", "12"];

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const deleteOneMovie = (id) => {
        setDeleteOne(id);
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            if (loadOnce) {
                await movies$.then(res => {
                    setPosts(res);
                    setLoading(false);
                })
                setLoadOnce(false);
            } else {
                setLoading(false)
            }
        }

        const getCategory = () => {
            let categories = Object.keys(posts).map((i) => posts[i].category);
            let categoriesFiltered = [...new Set(categories)];

            setCategory(categoriesFiltered);
        }

        const deleteMovie = () => {

            if (deleteOnce !== false) {
                if (sortedData.length > 0) {
                    /** TODO a refaire: Pas propre du tout  **/
                    let indexOfMovie = sortedData.findIndex((movie) => {
                        return movie.id === `${deleteOnce}`;
                    })

                    let indexOfMoviePosts = posts.findIndex((movie) => {
                        return movie.id === `${deleteOnce}`;
                    })

                    sortedData.splice(indexOfMovie, 1);
                    posts.splice(indexOfMoviePosts, 1);

                    setPosts(posts);

                    setSortedData(sortedData);
                    setDeleteOne(false);
                } else {
                    let indexOfMovie = posts.findIndex((movie) => {
                        return movie.id === `${deleteOnce}`;
                    })

                    posts.splice(indexOfMovie, 1);

                    setPosts(posts);
                    setDeleteOne(false);
                }

            }
        }


        fetchPosts().catch((e) => console.error('fetchPosts function : ' + e));
        deleteMovie();
        getCategory();
    }, [posts, deleteOnce])

    /**
     * function sortedMovies
     * Permet de mettre a jour le tableau des genres selectionés
     */
    const sortedMovies = () => {
        const dataMovieObj = Object.keys(posts).map((i) => posts[i]);
        const sortedMovie = [];

        for (let data of dataMovieObj) {
            if (selectedFilter.includes(data.category)) {
                sortedMovie.push(data)
            }
        }

        setSortedData(sortedMovie);
    }

    /**
     * function updateSelectedFilter
     * @param e
     * Ajoute / Supprime un élément de la liste des filtres séléctionnés
     */
    const updateSelectedFilter = (e) => {
        const filter = e.target.value;
        const newFilters = selectedFilter;

        if (selectedFilter.includes(filter)) {
            const indexFilter = selectedFilter.indexOf(filter);

            newFilters.splice(indexFilter, 1);
            setSelectedFilter(newFilters);

        } else {

            newFilters.push(filter);
            setSelectedFilter(newFilters);
        }

        sortedMovies();
    }

    const isSorted = () => {
        return sortedData.length > 0 ? sortedData.length : posts.length
    }

    const postPerPageStyle = (e) => {
        styleCard(e).then(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length > 0) {
                for (let card of cards) {
                    if (e.target.value === 12) {
                        card.classList.add('card-12');
                    }
                }
            }

        })
    }

    const styleCard = async (e) => {
        setPostsPerPage(e.target.value);
    }

    return (
        <div className="wrapper_movie container mt-2">
            <div className="filters p-2">
                <h3>Recherche par catégories: </h3>
                <div className="filters-list d-flex flex-row pt-2 pb-2">
                    {category.map((filter) => {
                        return (
                            <div className="d-flex flex-md-row  flex-column align-items-center" key={filter}>
                                <input type="checkbox" value={filter} id={filter}
                                    onChange={(e) => updateSelectedFilter(e)} />
                                <label htmlFor={filter}>{filter}</label>
                            </div>
                        )
                    })}
                </div >
            </div >
            <div className="pagination-number d-flex flex-row align-items-center justify-content-end pt-2 pb-2">
                <div className="px-md-2 pr-2">Afficher par: </div>
                <div className="d-flex flex-row p-2">
                    {radios.map((radio) => {
                        return (
                            <div key={radio}>
                                <input type="radio" value={radio} id={radio} checked={radio === postsPerPage} onChange={(e) => postPerPageStyle(e)} />
                                <label htmlFor={radio}>{radio}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='cards col-12 pt-2 pb-2 w-100'>
                <ShowMovies posts={currentPosts}
                    loading={loading}
                    sortedData={sortedData}
                    postsPerPage={postsPerPage}
                    deleteOneMovie={deleteOneMovie}
                />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={isSorted()}
                    paginate={paginate}
                    sortedData={sortedData}
                    currentPage={currentPage}
                />
            </div>
        </div>

    );

};

export default Movies;