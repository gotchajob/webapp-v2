import { RatingParams } from "components/review";

import { useEffect, useState } from "react";
import { CustomerToken } from "./use-login";
import { GetBookingCustomerFeedback, GetBookingCustomerFeedbackRequest } from "package/api/booking-customer-feedback";
import { GetBookingCustomerTotalRating, GetBookingCustomerTotalRatingRequest } from "package/api/booking-customer-feedback/total-rating/expertId";
import customer from "store/slices/customer";

export const useGetCustomerBookingTotalRating = (
  params1: GetBookingCustomerTotalRatingRequest,
  params2: GetBookingCustomerFeedbackRequest,
  refreshTime: number
) => {
  const [ratingParams, setRatingParams] = useState<RatingParams | undefined>();

  const { customerToken } = CustomerToken();

  const getTotalRating = async () => {
    const totalRating = await GetBookingCustomerTotalRating(params1);
    const feedback = await GetBookingCustomerFeedback(params2);
    const newRatingParams: RatingParams = {
      feedbackList: [],
      totalRatingList: [
        { rating: 5, count: 0 },
        { rating: 4, count: 0 },
        { rating: 3, count: 0 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 },
      ],
    };

    totalRating.data.forEach((value) => {
      const index = newRatingParams.totalRatingList.findIndex(
        (e) => e.rating === value.rating
      );
      newRatingParams.totalRatingList[index].count = newRatingParams.totalRatingList[index].count + value.count
    });

    feedback.data.list.forEach((value) =>
      newRatingParams.feedbackList.push({
        ...value,
        user: {
          avatar: "",
          fullName: "Nguời dùng",
        },
        href: `/expert/interview/${value.bookingId}`,
      })
    );
    setRatingParams(newRatingParams);
  };

  useEffect(() => {
    if (customerToken) {
      getTotalRating();
    }
  }, [refreshTime, customerToken]);

  return {
    ratingParams,
  };
};
