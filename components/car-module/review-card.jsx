import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import anonymousImg from "@/public/images/non_profile_image.webp";
import { Separator } from "../ui/separator";
import Button from "../ui/button";
import StarRatings from "../ui/star-ratings";
import { useEffect, useState } from "react";
import UnclampedReviewModal from "./unclamped-review-modal";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "@/store";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { sendRequest } from "@/lib/fetch-client";

export default function ReviewCard({
  reviewData,
  clamp = false,
  brandSlug,
  modelSlug,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { id, profilePic, name, rating, review, totalLikes, review_like } =
    reviewData;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const { mutate: likeReview, isPending } = useMutation({
    mutationFn: () =>
      sendRequest(
        `ratings-and-reviews/${brandSlug}/${modelSlug}`,
        { id },
        "PUT"
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["r&r"] });
    },
  });

    const handleLikeClick = () => {
      if (!user?.mobile) {
        dispatch(openAuthModal());
      } else {
        likeReview();
      }
    };

  const reviewContent =
    review.length > 120 && clamp ? (
      <>
        <span>{review.substring(0, 120)} ... </span>
        <Button
          variant="link"
          className="p-0 inline text-primary-lighter text-xs lg:text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Read more
        </Button>
      </>
    ) : (
      review
    );

  return (
    <>
      <Card className="p-2">
        <CardHeader className="p-1">
          <CardTitle className="flex items-center gap-4">
            <Image
              src={anonymousImg}
              alt="user default avatar"
              className="size-8 lg:size-9 rounded-full"
            />
            <span className="text-sm lg:text-base font-medium">{name}</span>
          </CardTitle>
          <span className="hidden">
            <CardDescription>Card Description</CardDescription>
          </span>
        </CardHeader>
        <Separator className="my-2" />
        <CardContent className="p-1 text-xs md:text-sm text-gray-darker">
          {reviewContent}
        </CardContent>
        <Separator className="my-2" />
        <CardFooter className="p-1 flex items-center justify-between">
          <StarRatings readOnly rating={rating} />
          <Button
            className="bg-transparent p-0 text-primary-lighter inline-flex items-center gap-x-1.5"
            onClick={handleLikeClick}
          >
            {review_like ? (
              <i className="bx bxs-like text-lg"></i>
            ) : (
              <i className="bx bx-like text-lg"></i>
            )}
            <span className="text-sm font-medium">{totalLikes}</span>
          </Button>
        </CardFooter>
      </Card>
      <UnclampedReviewModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        reviewData={reviewData}
      />
    </>
  );
}
