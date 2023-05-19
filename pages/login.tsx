import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LogIn(props) {
  const session = useSession();
  const router = useRouter();
  
  const [values, setValues] = useState({
    username: '',
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
 
  const handleLoginUser = async (e) => {    
    e.preventDefault();
    await signIn("credentials", {
      redirect: true,
      username: values.username,
      password: values.password
    });
  }
  return <form onSubmit={handleLoginUser}>
    <h1>Log in</h1>
    <div>
      <label>Username: 
        <input type="text" value={values.username} onChange={handleChange('username')}></input>
      </label>
    </div>
    <div>
      <label>Password: 
        <input type="password" value={values.password} onChange={handleChange('password')}></input>
      </label>
    </div>
    <div>
      <span>Don't have an account?</span>
      {' '}
      <Link href="/signup">Sign up</Link>
    </div>
    <button>Submit</button>
  </form>
}