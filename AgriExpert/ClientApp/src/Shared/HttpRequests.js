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
    },
    adminConfigurations: {
        async getAllExperts(authURL) {
            //GET call
            const data = await fetch('/expert', {
                method: 'GET',
                headers: authURL
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        },
        async adminLogIn(payload) {
            const data = await fetch("/Auth/adminlogin", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload) 
            })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                return error;
            })
            return data;
        }
    },
    customerConfigurations: {
        async getAllCustomers(authURL) {
            //GET call
            const data = await fetch('/customer', {
                method: 'GET',
                headers: authURL
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        }
    },
    questionConfigurations: {
        async getAllQuestions(authURL) {
            //GET call
            const data = await fetch('/question', {
                method: 'GET',
                headers: authURL
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        },
        async getAllQuestionsWithExpertID(id, authURL) {
            //GET call
            const data = await fetch(`/question/expert/${id}`, {
                method: 'GET',
                headers: authURL
            }).then(response => response.json())
                .catch((error) => {
                    console.log(error)
                })
            return data;
        }
    },
    expertConfigurations: {
        async expertLogIn(payload) {
            const data = await fetch("/Auth/expertlogin", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then((response) => {
                    return response.json();
                })
                .catch((error) => {
                    return error;
                })
            return data;
        }
    },
    authConfigurations: {
        async getAuthURL(isApiUrl,token) {
            const isLoggedIn = !!token;
            if (isLoggedIn && isApiUrl) {
                return { Authorization: `Bearer ${token}` };
            } else {
                return {};
            }
        }
    }
};