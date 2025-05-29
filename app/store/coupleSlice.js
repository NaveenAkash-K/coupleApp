import getMemoriesAPI from "../apis/memoryTimeline/getMemoriesAPI";
import getMemoryImageAPI from "../apis/memoryTimeline/getMemoryImageAPI";
import getCoupleDetailsAPI from "../apis/couple/getCoupleDetailsAPI";

const coupleSlice = (set, get, api) => ({
    id: null,
    partner: {},
    linkedDate: null,
    memory: {
        count: 0,
        partnerCount: 0,
        totalCount: 0,
        firstMemoryDate: null,
        lastMemoryDate: null,
    },

    loadCoupleDetails: async () => {
        const response = await getCoupleDetailsAPI();
        const couple = response.data.couple;
        const userId = get().authSlice.userId;
        const isUserA = couple.userA._id === userId;
        set({id: couple._id})
        set({partner: !isUserA ? couple.userA : couple.userB})
        set({linkedDate: couple.createdAt})
        set({
            memory: {
                count: isUserA ? couple.userAMemories : couple.userBMemories,
                totalCount: couple.totalMemories,
                partnerCount: !isUserA ? couple.userAMemories : couple.userBMemories,
                firstMemoryDate: isUserA ? couple.userAFirstMemoryDate : couple.userBFirstMemoryDate,
                lastMemoryDate: isUserA ? couple.userALastMemoryDate : couple.userBLastMemoryDate,
            }
        })
    }
});

export default coupleSlice;
