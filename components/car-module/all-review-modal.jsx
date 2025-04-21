import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchDataClient } from "@/lib/fetch-client";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "./review-card";

export default function AllReviewModal({
  isOpen,
  setIsOpen,
  brandSlug,
  modelSlug,
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["r&r", { brand: brandSlug, model: modelSlug }],
    queryFn: () =>
      fetchDataClient(`ratings-and-reviews/${brandSlug}/${modelSlug}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[70dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Ratings & Reviews</DialogTitle>
          <span className="hidden">
            <DialogDescription>
              We value your feedback! Help others by leaving a review and rating
              our products. Your voice matters!
            </DialogDescription>
          </span>
        </DialogHeader>
        {data &&
          data?.reviews.length > 0 &&
          data.reviews.map((review) => (
            <ReviewCard key={review.id} reviewData={review} />
          ))}
      </DialogContent>
    </Dialog>
  );
}
