import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
  
  data: defineTable({
    userId: v.string(),
    settings: v.any(),
    name: v.string(),
  }).index("userId", ["userId"]),

  entries: defineTable({
    userId: v.string(),
    date: v.string(),
    overall: v.number(),
    energy: v.number(),
  }).index("by_user_and_date", ["userId", "date"]),
});