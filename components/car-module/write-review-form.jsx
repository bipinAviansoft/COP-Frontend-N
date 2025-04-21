import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { sendRequest } from "@/lib/fetch-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Button from "../ui/button";
import StarRatings from "../ui/star-ratings";

export default function WriteReviewForm({
  brandSlug,
  modelSlug,
  isOpen,
  setIsOpen,
}) {
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(3);

  const [formError, setFormError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const commentRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const comment = commentRef.current?.value;

    if (comment.length <= 10 || comment.length >= 1000) {
      return setValidationError({
        comment:
          "Comment must have at least 10 charcters and at max 1000 characters",
      });
    }

    submitReview({ review: comment, rating });
  };

  const handleChange = () => {
    setValidationError(null);
  };

  const { mutate: submitReview, isPending } = useMutation({
    mutationFn: (body) =>
      sendRequest(`ratings-and-reviews/${brandSlug}/${modelSlug}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["r&r"] });
      setIsOpen(false);
    },
    onError: (error) => {
      setFormError(error?.message || "Something went wrong!");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            We value your feedback! Help others by leaving a review and rating
            our products. Your voice matters!
          </DialogDescription>
        </DialogHeader>
        <StarRatings readOnly={false} rating={rating} setRating={setRating} />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Textarea
            ref={commentRef}
            placeholder="Have any comments?"
            onChange={handleChange}
          />
          {validationError?.comment && (
            <span className="text-destructive text-sm font-medium">
              {validationError.comment}
            </span>
          )}
          <Button className="block min-w-32" type="Submit" disabled={isPending}>
            {isPending ? (
              <i className="bx bx-loader-alt text-lg animate-spin"></i>
            ) : (
              "Submit Review"
            )}
          </Button>
          {formError && (
            <span className="text-destructive text-sm font-medium inline-block mt-2">
              {formError}
            </span>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
