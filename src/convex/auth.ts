import { createClient, type GenericCtx, type AuthFunctions } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components, internal } from "./_generated/api";
import { type DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth, type BetterAuthOptions } from "better-auth/minimal";
import authConfig from "./auth.config";


const siteUrl = process.env.SITE_URL!;

const authFunctions: AuthFunctions = internal.auth; 

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth, {
  authFunctions,
  triggers: {
    user: {
      onCreate: async (ctx, user) => {

        const userId_unclean = user._id;
        const userId = userId_unclean.replace(/["']/g, "");

        const name_unclean = user.name;
        const name = name_unclean.replace(/["']/g, "");

        await ctx.db.insert("data", { 
          userId:userId,
          settings:{},
          name: name,
          data:{}
        });
      },
      onUpdate: async (ctx, doc) => {
      },
      onDelete: async (ctx, doc) => {
      }
    }
  }
});

export const { onCreate, onUpdate, onDelete } = authComponent.triggersApi(); 

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Convex plugin is required for Convex compatibility
      convex({ authConfig }),
    ],
  })
}

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});