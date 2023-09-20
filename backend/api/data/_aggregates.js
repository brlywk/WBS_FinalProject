import { Types } from "mongoose";

const { ObjectId } = Types;

/**
 * Returns the pipeline to get usage score for subscriptions
 */
export function subscriptionUsageAggregate(userId, id = null) {
  const matchFilter = {
    userId,
  };

  if (id) {
    matchFilter._id = ObjectId(id);
  }

  console.log("matchFilter", matchFilter);

  const pipeline = [
    {
      $match: matchFilter,
    },
    {
      $lookup: {
        from: "usages",
        localField: "_id",
        foreignField: "subscriptionId",
        as: "subscriptionUsage",
      },
    },
    {
      $unwind: {
        path: "$subscriptionUsage",
      },
    },
    {
      $group: {
        _id: "$_id",
        totalScore: {
          $sum: "$subscriptionUsage.score",
        },
        count: {
          $sum: 1,
        },
        originalDoc: {
          $first: "$$ROOT",
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "originalDoc.category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
      },
    },
    {
      $addFields: {
        "originalDoc.averageScore": {
          $divide: ["$totalScore", "$count"],
        },
        "originalDoc.category": "$category",
        "originalDoc.count": "$count",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$originalDoc",
      },
    },
    {
      $project: {
        subscriptionUsage: 0,
      },
    },
  ];

  console.log("pipeline", pipeline);

  return pipeline;
}

/*
 * Return pipeline to get monthly savings per user
 */
export function potentialMonthlySavingsAggregate(userId) {
  const pipeline = [
    {
      $match: {
        userId,
      },
    },
    {
      $lookup: {
        from: "usages",
        localField: "_id",
        foreignField: "subscriptionId",
        as: "subscriptionUsage",
      },
    },
    {
      $project: {
        price: 1,
        interval: 1,
        usageCount: {
          $size: "$subscriptionUsage",
        },
        adjustedPrize: {
          $cond: [
            {
              $eq: ["$interval", "year"],
            },
            {
              $divide: ["$price", 12],
            },
            "$price",
          ],
        },
      },
    },
    {
      $match: {
        usageCount: {
          $gt: 4,
        },
      },
    },
    {
      $group: {
        _id: null,
        potentialMonthlySavings: {
          $sum: "$adjustedPrize",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ];

  console.log("pipeline", pipeline);

  return pipeline;
}

/*
 * Return pipeline to get total monthly cost of all subscriptions
 */
export function totalMonthlyCostAggregate(userId) {
  const pipeline = [
    {
      $match: {
        userId,
      },
    },
    {
      $project: {
        price: 1,
        interval: 1,
        adjustedPrize: {
          $cond: [
            {
              $eq: ["$interval", "year"],
            },
            {
              $divide: ["$price", 12],
            },
            "$price",
          ],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalCostPerMonth: {
          $sum: "$adjustedPrize",
        },
        count: {
          $sum: 1,
        },
      },
    },
  ];

  console.log("pipeline", pipeline);

  return pipeline;
}

/**
 * Returns the most used subscription (i.e. highest total score) for user
 */
export function mostUsedSubscriptionAggregate(userId) {
  const pipeline = subscriptionUsageAggregate(userId);

  const additionalStages = [
    {
      $sort: {
        averageScore: -1,
      },
    },
    {
      $limit: 1,
    },
  ];

  const finalPipeline = pipeline.concat(additionalStages);

  console.log("finalPipeline", finalPipeline);

  return finalPipeline;
}
