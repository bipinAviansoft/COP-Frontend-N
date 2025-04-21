"use client";

import Button from "../ui/button";
import Ratings from "./ratings";
import { useQuery } from "@tanstack/react-query";
import { fetchDataClient } from "@/lib/fetch-client";
import ReviewCard from "./review-card";
import { useState } from "react";
import WriteReviewForm from "./write-review-form";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/store";
import AllReviewModal from "./all-review-modal";

export default function RatingsAndReviews({ brandSlug, modelSlug }) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [isAllReviewModalOpen, setIsAllReviewModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "r&r",
      { brand: brandSlug, model: modelSlug, limit: 4, user: user?.mobile },
    ],
    queryFn: () =>
      fetchDataClient(`ratings-and-reviews/${brandSlug}/${modelSlug}?limit=4`),
  });

  const handleWriteReviewClick = () => {
    if (!user?.mobile) {
      dispatch(openAuthModal());
    } else {
      setIsReviewModalOpen(true);
    }
  };

  if (data) {
    const {
      user_review_exist,
      reviews,
      ratingCount,
      totalRating,
      averageRating,
    } = data;

    return (
      <>
        <div className="bg-gradient-to-bl from-[#00304400] to-[rgba(1,119,170,.3029586834733894)]">
          <div className="container py-4 flex justify-between items-center">
            <div>
              <h3 className="uppercase text-lg font-bold md:text-xl lg:text-2xl text-primary-darker">
                Ratings & Reviews
              </h3>
              <p className="text-primary-darker font-semibold md:hidden">
                Have your say on it
              </p>
            </div>
            {!user_review_exist && (
              <div className="flex items-center gap-x-3">
                <p className="hidden lg:block text-primary-darker font-semibold">
                  Help others decide
                </p>
                <Button
                  className="gap-x-2 uppercase py-1 px-3"
                  onClick={handleWriteReviewClick}
                  animated
                >
                  <span>Write a review</span>
                  <i className="bx bx-pencil text-lg"></i>
                </Button>
              </div>
            )}
          </div>
        </div>
        {reviews?.length > 0 && (
          <div className="md:bg-stone-200">
            <div className="container py-4 space-y-4 lg:space-y-0 lg:py-12 lg:grid lg:grid-cols-4 lg:gap-4">
              <span className="lg:col-span-1">
                <Ratings
                  avgRating={averageRating}
                  total={totalRating}
                  ratingCount={ratingCount}
                />
              </span>
              <div className="lg:col-span-3 space-y-4">
                <div className="lg:w-[90%] mx-auto grid grid-col-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {reviews.map((review) => {
                    const { id } = review;
                    return (
                      <ReviewCard
                        key={id}
                        reviewData={review}
                        clamp={true}
                        brandSlug={brandSlug}
                        modelSlug={modelSlug}
                      />
                    );
                  })}
                </div>
                {
                  /* totalRating > 4 */ true && (
                    <div className="lg:w-[90%] mx-auto flex justify-end">
                      <Button
                        className="px-3 lg:px-8 py-2 text-sm lg:text-base font-medium uppercase"
                        onClick={() => setIsAllReviewModalOpen(true)}
                        animated
                      >
                        View All
                      </Button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        )}
        <WriteReviewForm
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          isOpen={isReviewModalOpen}
          setIsOpen={setIsReviewModalOpen}
        />
        <AllReviewModal
          brandSlug={brandSlug}
          modelSlug={modelSlug}
          isOpen={isAllReviewModalOpen}
          setIsOpen={setIsAllReviewModalOpen}
        />
      </>
    );
  }
}
