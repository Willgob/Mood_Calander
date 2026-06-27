import { mutation } from "./_generated/server";


export const createBasicData = mutation({
//   args: { text: v.string()},
  handler: async (ctx) => {
    await ctx.db.insert("data", { 
      userId:"test",
      settings:{},
      name:"William"
    },
    );
  },
});