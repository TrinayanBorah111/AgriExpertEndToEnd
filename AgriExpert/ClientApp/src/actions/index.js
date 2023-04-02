export default {
    actionCalls: {
        addExpertDetails(expertdetails) {
            return {
                type: "EXPERT_ALL_VALUES",
                payload: expertdetails,
            };
        },
    }
}