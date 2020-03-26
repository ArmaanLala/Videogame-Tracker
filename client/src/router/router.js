import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home";
// import NewEmployee from "../components/NewEmployee";
// import ViewEmployee from "../components/ViewEmployee";
// import EditEmployee from "../components/EditEmployee";
import ViewProfile from '../components/ViewProfile';
import Login from "../components/Login";
import Register from "../components/Register";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: {
                requiresGuest: true
            }
        },
        {
            path: "/users/:user_id",
            name: "view-profile",
            component: ViewProfile,
            meta: {
                requiresAuth: true
            }
        },
        // {
        //     path: "/new",
        //     name: "new-employee",
        //     component: NewEmployee,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        // {
        //     path: "/edit/:employee_id",
        //     name: "edit-employee",
        //     component: EditEmployee,
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        // {
        //     path: "/:employee_id",
        //     name: "view-employee",
        //     component: ViewEmployee,
        //     meta: {
        //         requiresAuth: true
        //     }
        // }
    ]
});

//Nav Guards

router.beforeEach((to, from, next) => {
    //Check for required Auth guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
        //Check if NOT Logged in
        if (!firebase.auth().currentUser) {
            // GO to login page
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            // Proceed to the route
            next()
        }
    } else if (
        to.matched.some(record => 
            record.meta.requiresGuest
        )
    ) {
        //Check if Logged in
        if (firebase.auth().currentUser) {
            // GO to login page
            next({
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            // Proceed to the route
            next()
        }
    } else {
        next()
    }
});

export default router;
