export default {
    actionCalls: {
        addExpertDetails(expertdetails) {
            return {
                type: "EXPERT_ALL_VALUES",
                payload: expertdetails,
            };
        },
        addCustomerDetails(customerdetails) {
            return {
                type: "CUSTOMER_ALL_VALUES",
                payload: customerdetails,
            };
        },
    }
}