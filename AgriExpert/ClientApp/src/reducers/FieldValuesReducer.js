export default {
    FieldvaluesReducer: {
        expertDetailsReducer(state = null, action) {
            switch (action.type) {
                case "EXPERT_ALL_VALUES":
                    return (state = action.payload);
                default:
                    return state;
            }
        },
        customerDetailsReducer(state = null, action) {
            switch (action.type) {
                case "CUSTOMER_ALL_VALUES":
                    return (state = action.payload);
                default:
                    return state;
            }
        },
    }
}