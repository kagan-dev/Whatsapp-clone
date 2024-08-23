import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createConversation = mutation({
  args: {
    partipications: v.array(v.id("users")),
    isGroup: v.boolean(),
    groupName: v.optional(v.string()),
    groupImage: v.optional(v.id("_storage")),
    admin: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    let existingConversation;
    if (args.isGroup) {
      existingConversation = await ctx.db
        .query("conversations")
        .filter((q) =>
          q.and(
            q.eq(q.field("partipications"), args.partipications),
            q.eq(q.field("isGroup"), true)
          )
        )
        .first();
    } else {
      existingConversation = await ctx.db
        .query("conversations")
        .filter((q) =>
          q.or(
            q.eq(q.field("partipications"), args.partipications),
            q.eq(q.field("partipications"), args.partipications.reverse())
          )
        )
        .first();
    }

    if (existingConversation) {
      return existingConversation._id;
    }

    let groupImage;

    if (args.groupImage) {
      groupImage = (await ctx.storage.getUrl(args.groupImage)) as string;
    }

    const conversationId = await ctx.db.insert("conversations", {
      partipications: args.partipications,
      isGroup: args.isGroup,
      groupName: args.groupName,
      groupImage,
      admin: args.admin,
    });

    return conversationId;
  },
});

export const getMyConversations = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new ConvexError("User not found");

    const conversations = await ctx.db.query("conversations").collect();

    const myConversations = conversations.filter((conversation) => {
      return conversation.partipications.includes(user._id);
    });

    const conversationsWithDetails = await Promise.all(
      myConversations.map(async (conversation) => {
        let userDetails = {};

        if (!conversation.isGroup) {
          const otherUserId = conversation.partipications.find(
            (id) => id !== user._id
          );
          const userProfile = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("_id"), otherUserId))
            .take(1);

          userDetails = userProfile[0];
        }

        const lastMessage = await ctx.db
          .query("messages")
          .filter((q) => q.eq(q.field("conversation"), conversation._id))
          .order("desc")
          .take(1);
        return {
          ...userDetails,
          ...conversation,
          lastMessage: lastMessage[0] || null,
        };
      })
    );

    return conversationsWithDetails;
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const kickUser = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Unauthorized");

    const conversation = await ctx.db
      .query("conversations")
      .filter((q) => q.eq(q.field("_id"), args.conversationId))
      .unique();

    if (!conversation) throw new ConvexError("Conversation not found");

    await ctx.db.patch(args.conversationId, {
      partipications: conversation.partipications.filter(
        (id) => id !== args.userId
      ),
    });
  },
});
