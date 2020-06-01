import React from 'react';
import './Rating.css';
import axios from 'axios';
import { withRouter } from 'react-router';

const Rating = props => {
  const [rating, setRating] = React.useState([]);
  let ratingName;

  React.useEffect(() => {
    const displayRating = () => {
      return axios
        .get('/api/ratingName')
        .then(response => {
          ratingName = response.data.genre.reduce((r, e) => {
            r.push(e.SuggestiveContent);
            return r;
          }, []);
          return axios.get('/api/bookRating');
        })
        .then(response => {
          setRating(
            response.data.Rating.map((e, i) => {
              if (Number(props.match.params.id) === e.BookId) {
                return (
                  <div key={e.Id}>
                    <div className="rating-summary-container">
                      <strong>
                        {ratingName[e.GenreId - 1]} <i>{e.GenreRating}/10</i>
                      </strong>
                      <div className="rating-summary-description">
                        {e.Description}
                      </div>
                    </div>
                  </div>
                );
              }
            })
          );
        })
        .catch(err => {
          alert(err);
        });
    };
    displayRating();
  }, []);

  return <div className="Rating-App">{rating}</div>;
};

export default withRouter(Rating);
