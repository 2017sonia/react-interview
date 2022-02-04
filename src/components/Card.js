import React, { useState, useEffect } from 'react';
import Like from '../assets/like.png'
import Dislike from '../assets/dislike.png'

const Card = ({ movie, setDeleteMovieCard }) => {

    const [like, setLike] = useState(movie.likes);
    const [dislike, setDislike] = useState(movie.dislikes);
    const [vote, setVote] = useState(null);


    const ratioLikesDislike = () => {
        let likes = movie.likes, dislikes = movie.dislikes, score = likes + dislikes;
        let percent = Math.round((likes * 100) / score);

        return percent + '%';
    }

    const [ratioLikes, setRatioLikes] = useState(ratioLikesDislike());


    useEffect(() => {
        movie.likes = like;
        setRatioLikes(ratioLikesDislike());
        return () => {
            movie.likes = like;
            setRatioLikes(ratioLikesDislike());

        }
    }, [like])

    useEffect(() => {
        movie.dislikes = dislike;
        setRatioLikes(ratioLikesDislike());
        return () => {
            movie.dislikes = dislike;
            setRatioLikes(ratioLikesDislike());
        }
    }, [dislike])

    const voteLikeDislike = (e) => {
        let button = e.target;
        let buttonName = e.target.dataset.name;

        if (vote !== null) {
            document.querySelector('.button-active').classList.remove('button-active');
        }

        switch (vote) {
            case null:
                if (buttonName === 'like') {
                    setLike(like + 1);
                    setVote(true);
                    button.classList.add('button-active');
                } else {
                    setDislike(dislike + 1);
                    setVote(false);
                    button.classList.add('button-active');
                }
                break;
            case true:
                if (buttonName === 'like') {
                    setLike(like - 1);
                    setVote(null);
                    button.classList.remove('button-active');
                } else {
                    setDislike(dislike + 1);
                    setLike(like - 1);
                    setVote(false);
                    button.classList.add('button-active');
                }
                break;
            case false:
                if (buttonName === 'like') {
                    setLike(like + 1);
                    setDislike(dislike - 1);
                    setVote(true);
                    button.classList.add('button-active');
                } else {
                    setDislike(dislike - 1);
                    setVote(null);
                    button.classList.remove('button-active');
                }
                break;
            default:
                break;
        }
    }

    return (

        <div className="col-md-3 col-12 d-flex mb-3" key={movie.id}>
            <div className="card w-100">
                <div className="card-header h-100">
                    <h2 className="card-title">{movie.title}</h2>
                    <div className="card-subtitle mb-2">{movie.category}</div>
                </div>
                <div className="card-body text-left">
                    <div className="d-flex flex-row justify-content-around  likes w-100 mb-2">

                        <div className="likes-dislikes dislikes-infos">
                            <button id="button-dislike" data-name="dislike" onClick={(e) => voteLikeDislike(e)} />
                            <img src={Dislike} width="25px" alt="dislike" /> {dislike}
                        </div>
                        <div className="likes-dislikes likes-infos">
                            <button id="button-like" data-name="like" onClick={(e) => voteLikeDislike(e)} />  <img src={Like} width="25px" alt="like" />
                            {like}
                        </div>
                    </div>
                    <button className="btn btn-delete" onClick={() => setDeleteMovieCard(movie.id)}>Delete</button>

                </div>
            </div>
        </div >
    );
};

export default Card;