import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const createBasicData = mutation({
//   args: { text: v.string()},
  handler: async (ctx) => {
    await ctx.db.insert("data", { 
      userId:"test",
      settings:{},
      name:"William",
    },
    );
  },
});

export const getDataId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("data")
      .withIndex("userId", (q) => q.eq("userId", args.userId))
      .unique();

    return doc?._id;
  },
});

export const getData = query({
  args: { id: v.id("data") },
  handler: async (ctx, args) => {
    const { id } = args;
    const data = await ctx.db.get(id);
    console.log("data????",data); 
    return data;
  }
});
