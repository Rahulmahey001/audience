import { NextResponse } from 'next/server';

import dbConnect from '@/lib/DBconnection';
import Review from '@/models/Review';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, rating, review } = await request.json();

    if (!name || !rating || !review) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide all required fields: name, rating, and review'
        },
        { status: 400 }
      );
    }

    const numericRating = Number(rating);
    if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: 'Rating must be a number between 1 and 5'
        },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name cannot be more than 100 characters'
        },
        { status: 400 }
      );
    }

    if (review.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          message: 'Review cannot be more than 1000 characters'
        },
        { status: 400 }
      );
    }

    const newReview = await Review.create({
      name: name.trim(),
      rating: numericRating,
      review: review.trim(),
      createdAt: new Date()
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully',
        data: {
          id: newReview._id,
          name: newReview.name,
          rating: newReview.rating,
          review: newReview.review,
          createdAt: newReview.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading review:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}