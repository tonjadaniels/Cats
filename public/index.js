/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};

var SignupPage = {
  template: "#signup-page",
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("/api/users", params)
        .then(function(response) {
          router.push("/login");
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};

var LoginPage = {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email, password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(function(response) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          router.push("/");
        })
        .catch(
          function(error) {
            this.errors = ["Invalid email or password."];
            this.email = "";
            this.password = "";
          }.bind(this)
        );
    }
  }
}

var LogoutPage = {
  template: "<h1>Logout</h1>",
  created: function() {
    axios.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("jwt");
    router.push("/");
  }
};

var CatsIndexPage = {
  template: "#cats-index-page",
   data: function() {
    return {
      cats: []
    };
   },
   created: function() {
    axios.get("/api/cats").then(function(response){
      this.cats = response.data;
      console.log(this.cats);
    }.bind(this));
   } 
};

var CatsNewPage = {
  template: "#cats-new-page",
   data: function() {
    return {
      name: "",
      breed: "",
      age: "",
      registry: "",
      image: ""
      errors: []
    };
   },
   methods: {
    submit: function() {
      var params = {
        name: this.name,
        breed: this.breed,
        age: this.age,
        registry: this.registry,
        image: this.image
      };
      axios
      .post("/api/cats", params)
      .then(function(response) {
        console.log(response.data);
        router.push("/cats/" + response.data.id);
      })
      .catch(
        function(error) {
          this.errors = error.response.data.errors;
        }.bind(this));
      }
   } 
};

var CatsShowPage = {
  template: "#cats-show-page",
   data: function() {
    return {
      cat: {},
      name: "",
      breed: "",
      age: "",
      registry: "",
      image: "",
      errors: []
    };
   },
   created: function() {
    axios
      .get("/api/cats/" + this.$route.params.id).then(function(response){
        this.cat = response.data;
        console.log(this.cat);
      }.bind(this));
    },
    methods: {
      submit: function() {
        var params = {
          name: this.name,
          breed: this.breed,
          age: this.age,
          registry: this.registry,
          image: this.image,
          cat_id: this.cat.id
        }
        axios
          .post("/api/cats", params)
          .then(function(response) {
            console.log(response.data);
            router.push("/home/" + response.data.id);
          })
          .catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this));
        }
    },
    computed: {}
};

var router = new VueRouter({
  routes: [
  { path: "/", component: HomePage },
  { path: "/signup", component: SignupPage },
  { path: "/login", component: LoginPage },
  { path: "/logout", component: LogoutPage },
  { path: "/cats", component: CatsIndexPage },
  { path: "/cats/new", component: CatsNewPage }, 
  { path: "/cats/:id", component: CatsShowPage } 
  ]
});

var app = new Vue({
  el: "#vue-app",
  router: router,
  created: function() {
    var jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = jwt;
    }
  }

});
