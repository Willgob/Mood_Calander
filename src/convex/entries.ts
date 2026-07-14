import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMonthEntries = query({
    args: {
        userId: v.string(),
        month: v.number(),
        year: v.number()
    },
    handler: async(ctx,  { userId, month, year}) => {
    const start = `${year}-${String(month + 1).padStart(2, "0")}-01`;
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const end = `${year}-${String(month + 1).padStart(2, "0")}-${String(daysInMonth).padStart(2, "0")}`;

            const rawEntries = await ctx.db
                .query("entries")
                .withIndex("by_user_and_date", (q) =>
                    q.eq("userId", userId).gte("date", start).lte("date", end)
                )
                .collect();
            
            const entriesByDate = new Map<string, {energy: number, overall: number}[]>()

            for (const entry of rawEntries) {
                const existing = entriesByDate.get(entry.date) ?? [];
                existing.push({energy: entry.energy, overall: entry.overall});
                entriesByDate.set(entry.date, existing);
            }

            const result = [];
            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const entriesForDay = entriesByDate.get(dateStr);

                if (entriesForDay && entriesForDay.length > 0) {
                    const avgEnergy = entriesForDay.reduce((sum, e) => sum + e.energy, 0) / entriesForDay.length;
                    const avgOverall = entriesForDay.reduce((sum, e) => sum + e.overall, 0) / entriesForDay.length;

                    result.push({ date: dateStr, energy: avgEnergy, overall: avgOverall });
                } else {
                    result.push({ date: dateStr, energy: null, overall: null });
                }
            }
            return result;
    }

})

export const addEntry = mutation({
    args: {
        userId: v.string(),
        date: v.string(),
        energy: v.number(),
        overall: v.number()
    },
    handler: async(ctx, { userId, date, energy, overall}) => {
        const id = await ctx.db.insert("entries", {
            userId,
            date,
            energy,
            overall
        });
        return id;
    }
})