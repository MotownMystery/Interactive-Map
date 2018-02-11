// firebase interactive-map

class FireBase {
    constructor(){
        this.config = {
            apiKey: "AIzaSyAdWKgrquitVPYVZaieV2ZZFJKC95Iel98",
            authDomain: "interactive-map-f5060.firebaseapp.com",
            databaseURL: "https://interactive-map-f5060.firebaseio.com",
            projectId: "interactive-map-f5060",
            storageBucket: "interactive-map-f5060.appspot.com",
            messagingSenderId: "595861650630"
          };
        this.firebase = firebase.initializeApp(this.config);
        this.database = this.firebase.database();

        //elementy do logowania
        this.logIn = document.getElementById("logIn");
        this.signIn = document.getElementById("signIn");
        this.logOut = document.getElementById("logOut");
        this.btnSendSign = document.getElementById("sendSignIn");
        this.btnSendLog = document.getElementById("sendLogIn");
        this.form = document.getElementById("signInForm");
        this.array = [];

          
        //pokaz formularz do logowania
        this.logIn.addEventListener("click", e =>{
            document.getElementById('logInForm').style.display = "block";
           
        });
        // this.logOut.classList.add("hide");


        //wylogowanie sie uzytkownika
        this.logOut.addEventListener("click", e => {
            this.firebase.auth().signOut()
        })

        //pokaz formularz do rejestracji
        this.signIn.addEventListener("click", e => {
        
            this.form.style.display = "block";

        });

        //zalogowanie uzytkownika
        this.btnSendLog.addEventListener("click", e => {
            e.preventDefault();
            const passw = document.getElementById("password").value;
            const email = document.getElementById("email").value
            const auth = this.firebase.auth();
    
            const promise = auth.signInWithEmailAndPassword(email, passw);
            promise.catch(e => console.log(e.message));

        })

        //rejestracja nowego uzytkownika
        this.btnSendSign.addEventListener("click", e => {
            e.preventDefault();
            const passw = document.getElementById("password").value;
            const email = document.getElementById("email").value;
            const auth = this.firebase.auth();
    
            const promise = auth.createUserWithEmailAndPassword(email, passw);
            promise.catch(e => console.log(e.message));


            if(this.form.style.display !== "none"){
                this.form.style.display = "none";
            }
    
        })
    }


    newUserSign(){
        this.firebase.auth().onAuthStateChanged( user =>{
            if(user){   
                console.log(user + "logged in" + this.firebase.auth().currentUser.uid);
                this.logOut.classList.remove("hide");
            } else {
                console.log('not logged in');
                this.logOut.classList.add("hide");
            }
        })
    }


}

export {FireBase};