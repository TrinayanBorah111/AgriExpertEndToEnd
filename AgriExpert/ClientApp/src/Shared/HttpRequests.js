export default {
    packageConfigurations: {
        async getAllPackages() {
            //GET call
            const data = await fetch('/package', {
                  method: 'GET'
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        }
        //async putAdminLogin(payload) {
        //    return new Promise((resolve, reject) => {
        //        authConfig
        //            .put("/adminlogin/", payload)
        //            .then((res) => resolve(res))
        //            .catch((err) => reject(err));
        //    });
        //}
    },
    adminConfigurations: {
        async getAllExperts() {
            //GET call
            const data = await fetch('/expert', {
                method: 'GET'
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        }
    },
    customerConfigurations: {
        async getAllCustomers() {
            //GET call
            const data = await fetch('/customer', {
                method: 'GET'
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        }
    },
    questionConfigurations: {
        async getAllQuestions() {
            //GET call
            const data = await fetch('/question', {
                method: 'GET'
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        },
        async getAllQuestionsWithExpertID(id) {
            //GET call
            const data = await fetch(`/question/expert/${id}`, {
                method: 'GET'
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        }
    }
};