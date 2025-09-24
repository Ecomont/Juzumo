import React from 'react';
import type { Review } from '../lib/types';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.date} className="review-item">
          <h3>{review.author}</h3>
          <p>{review.text}</p>
          <p>Rating: {review.rating} / 5</p>
          <p>Date: {new Date(review.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;