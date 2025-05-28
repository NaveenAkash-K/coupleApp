import getMemoriesAPI from "../apis/memoryTimeline/getMemoriesAPI";
import getMemoryImageAPI from "../apis/memoryTimeline/getMemoryImageAPI";

const memoryTimelineSlice = (set, get, api) => ({
    memories: [],

    loadMemories: async () => {
        try {
            const response = await getMemoriesAPI();
            const groupedMemories = response.data.groupedMemories;

            const updatedGroupedMemories = await Promise.all(
                groupedMemories.map(async (group) => {
                    const updatedData = await Promise.all(
                        group.data.map(async (memory) => {
                            if (memory.imageName) {
                                try {
                                    const res = await getMemoryImageAPI(memory.imageName);
                                    return {
                                        ...memory,
                                        base64: res.data.image,
                                    };
                                } catch (err) {
                                    console.error("Error fetching image for", memory._id, err);
                                    return memory;
                                }
                            }
                            return memory;
                        })
                    );

                    return {
                        ...group,
                        data: updatedData,
                    };
                })
            );

            set({memories: updatedGroupedMemories});
        } catch (e) {
            console.log(e);
        }
    },

    refreshMemories: async () => {
        try {
            const oldGrouped = get().memoryTimelineSlice.memories;
            const oldImagesMap = {};

            // Step 1: Build old base64 map
            oldGrouped.forEach(group =>
                group.data.forEach(memory => {
                    if (memory._id && memory.base64) {
                        oldImagesMap[memory._id] = memory.base64;
                    }
                })
            );

            // Step 2: Fetch new memory data
            const response = await getMemoriesAPI();
            const newGrouped = response.data.groupedMemories;

            // Step 3: Initially update state (without waiting for image fetch)
            const initialGrouped = newGrouped.map(group => {
                const updatedData = group.data.map(memory => {
                    return oldImagesMap[memory._id]
                        ? {...memory, base64: oldImagesMap[memory._id]}
                        : memory;
                });

                return {
                    ...group,
                    data: updatedData,
                };
            });

            // Set new memory data immediately
            set({memories: initialGrouped});

            // Step 4: In background, fetch base64 for new memories and update state
            for (const group of newGrouped) {
                const groupIndex = newGrouped.indexOf(group);
                const updatedData = await Promise.all(
                    group.data.map(async (memory) => {
                        if (
                            !oldImagesMap[memory._id] &&
                            memory.imageName
                        ) {
                            try {
                                const res = await getMemoryImageAPI(memory.imageName);
                                return {
                                    ...memory,
                                    base64: res.data.image,
                                };
                            } catch (err) {
                                console.error("Error fetching image for", memory._id, err);
                            }
                        }
                        return null;
                    })
                );

                const newImages = updatedData.filter(Boolean);

                if (newImages.length > 0) {
                    const currentMemories = get().memoryTimelineSlice.memories;

                    // Deep clone current memories and update base64
                    const updatedMemories = currentMemories.map((g, idx) => {
                        if (idx !== groupIndex) return g;
                        const updatedGroupData = g.data.map(mem => {
                            const newImage = newImages.find(n => n._id === mem._id);
                            return newImage ? {...mem, base64: newImage.base64} : mem;
                        });

                        return {
                            ...g,
                            data: updatedGroupData,
                        };
                    });

                    // Update only the affected group
                    set({memories: updatedMemories});
                }
            }
        } catch (e) {
            console.log("Error refreshing memories:", e);
        }
    },

    editMemory: async (updatedMemory, base64) => {
        const currentMemories = get().memoryTimelineSlice.memories
        const updatedMemories = currentMemories.map(group => {
            const updatedGroupData = group.data.map(mem => {
                if (mem._id === updatedMemory._id) {
                    return {
                        ...mem,
                        ...updatedMemory,
                        base64: base64
                    };
                }
                return mem;
            });

            return {
                ...group,
                data: updatedGroupData.sort((a,b) => new Date(a.date) - new Date(b.date)),
            };
        });

        set({memories: updatedMemories});
    }
});

export default memoryTimelineSlice;
