import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LogIn(props) {
  const session = useSession();
  const router = useRouter();
  
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    isMale: true,
    birthday: new Date(),
    password: '',
  });

  useEffect(() => {    
    if (session.status == 'authenticated') {
      console.log(session)
      router.push('/')
    }     
  }, [session])
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleIsMaleChange = (event) => {
    setValues({ ...values, isMale: event.target.value == "Male" })
  };
  const handleBirthdayChange = (event) => {
    setValues({ ...values, birthday: new Date(event.target.value) })
  }
 
  const handleSigninUser = async (e) => {    
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      username: values.username,
      password: values.password
    });
  }
  return <form onSubmit={handleSigninUser}>
    <h1>Create an account</h1>
    <div>
      <label>Your name: 
        <input type="text" value={values.firstName} onChange={handleChange('firstName')} placeholder="First name"></input>
        <input type="text" value={values.lastName} onChange={handleChange('lastName')} placeholder="Last name"></input>
      </label>
    </div>
    <div>
      <label>Email: 
        <input type="text" value={values.email} onChange={handleChange('email')}></input>
      </label>
    </div>
    <div>
      <label>Username: 
        <input type="text" value={values.username} onChange={handleChange('username')}></input>
      </label>
    </div>
    <div>
      <label>Gender: 
        <select value={values.isMale ? "Male": "Female"} onChange={handleIsMaleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
    </div>
    <div>
      <label>Birthday: 
        <input type="date" value={values.birthday.toISOString().split('T')[0]} onChange={handleBirthdayChange}></input>
      </label>
    </div>
    <div>
      <label>Password: 
        <input type="password" value={values.password} onChange={handleChange('password')}></input>
      </label>
    </div>
    <button>Submit</button>
  </form>
}