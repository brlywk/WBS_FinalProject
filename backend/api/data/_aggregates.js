import { Types } from "mongoose";

const { ObjectId } = Types;

export function getSubscriptionUsageAggregate(userId, id = null) {
  const matchFilter = {
    userId,
  };

  if (id) {
    matchFilter._id = ObjectId(id);
  }

  const aggregate = [
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

  return aggregate;
}
