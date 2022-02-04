import React, { useState, useEffect } from 'react';
import Card from "./Card";

const Posts = ({ posts, loading, sortedData, deleteOneMovie }) => {
    const [deleteMovie, setDeleteMovie] = useState(false);

    useEffect(() => {
        if (deleteMovie !== false) {
            deleteOneMovie(deleteMovie)
            setDeleteMovie(false);
        }

    }, [deleteMovie])

    const setDeleteMovieCard = (id) => {
        setDeleteMovie(id);
    }


    const ShowMovies = () => {
        if (sortedData.length > 0) {
            return (
                sortedData
                    .map((movie) => (
                        <Card movie={movie} setDeleteMovieCard={setDeleteMovieCard} key={movie.id} />
                    ))
            )
        } else {
            return (

                posts
                    .map((movie) => (
                        <Card movie={movie} setDeleteMovieCard={setDeleteMovieCard} key={movie.id} />
                    ))
            )
        }
    }

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div className="cards-list row d-flex flex-column flex-md-row ">
            <ShowMovies />
        </div>
    );
};

export default Posts;