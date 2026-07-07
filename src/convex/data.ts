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
      data:{}
    },
    );
  },
});

export const addEntry = mutation({
  args: { id: v.id("data")},
  handler: async(ctx, args) => {
    const { id } = args;
    const doc = await ctx.db.get(id);

    if (!doc) {
      throw new Error('Document not found');
    }

    const today = new Date().toISOString().split("T")[0];

    const existingIndex = doc.data.findIndex(
      (entry: { date: string; value: number }) =>
        entry.date.split("T")[0] === today
    );

    let updatedData;
      
    if (existingIndex !== -1) {
      updatedData = [...doc.data];
      updatedData[existingIndex] = {
        ...updatedData[existingIndex],
        value : 90
      }
    } else {
      updatedData = [...doc.data, { date: today, value: 50 }];
    }



    await ctx.db.patch(id, {
      data: updatedData,
    })

    console.log(await ctx.db.get( "data" , id));
  }
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
