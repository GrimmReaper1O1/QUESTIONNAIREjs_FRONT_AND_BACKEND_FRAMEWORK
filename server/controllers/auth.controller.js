import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import query from './../querys/querys.js';

const {insertIntoUsers, fetchUserViaEmail, updateFailedAttempts, resetFailedAttempts} = query;

async function signup(req, res)  {

  console.log(process.env.DATABASE, 'it got here as well');
  const { firstName, middleNames, surname, email, pass0 } = req.body;
  let hashedPassword = await bcrypt.hash(pass0, 10); // do research on this as to why it might be better.
  hashedPassword = hashedPassword.trim();
  let result0 = await fetchUserViaEmail(email);
  console.log(result0);
  if (result0.length < 1) {
    let result = insertIntoUsers(firstName, middleNames, surname, hashedPassword, email);
    console.log(result);
    if (result.affectedRows === 0) {
      res.status(500).json({error: 'No user was inserted!'});
    }

    let result1 = await fetchUserViaEmail(email);
    // enable when I get around to Oauthentication
    // const token = jwt.sign({ id: result1[0].id }, process.env.SECRET_KEY, { expiresIn: '48h' });
    // console.log(token);
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production', // Only change to secure in production true value
    //   sameSite: 'lax', // do strict in production

    //   path: '/',
    //   maxAge: 60 * 60 * 1000 * 3
    // });
    // adjust settings for both of the above tokens when you go with a ssl certificate.
    res.status(200).json({message: 'it was successfull', id: result.id});

  } else {
    res.status(501).json({error: 'Other user exists!'});
  }
};


async function  signin(req, res)  {
  const { email, password } = req.body;
  let isMatching = async (isMatch) => {
    if (!isMatch) {
      let upResult = await updateFailedAttempts(user.id);
      console.log(upResult);
      return res.status(401).json({ error: 'Invalid credentials' });

    } else {
      // const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '48h' });
      //       console.log(token);
      //  res.cookie('token', token, {
      //     httpOnly: true,
      //     secure: process.env.NODE_ENV === 'production',
      //     sameSite: 'lax', // do strict in production

      //     path: '/',
      //     maxAge: 60 * 60 * 1000 * 3
      //   });
      // adjust settings for both of the above tokens when you go with a ssl certificate.

      return  res.status(200).json({ message: 'Login successfull!', id: user.id});
    }
  }


  let results = await fetchUserViaEmail(email);
  console.log(results);
  if (results.length === 0) {
    return res.status(401).json({ error: 'User not found' });
  }
  console.log('got to login');
  let user = results[0];
  let unixTime;
  console.log(user)
  if (user.lastLogin !== null) {
    unixTime = Math.floor(new Date(user.lastLogin.replace(' ', 'T')).getTime());

  }
  console.log((Date.now()));
  console.log(unixTime+30*60*1000);
  if (user.lastLogin === null || user.failedAttempts < 5) {
    const isMatch = await bcrypt.compare(password, user.password.trim());
    console.log(isMatch, 'MATCH');
    return await isMatching(isMatch);
  }
  if (user.lastLogin === null || (user.failedAttempts >= 5 && Date.now() >= (unixTime+30*60*1000))) {
    let upResult = await resetFailedAttempts(user.id);
    const isMatch = await bcrypt.compare(password, user.password.trim());

    return await isMatching(isMatch);
    console.log(upResult);
  } else {
    console.log('locked out');

    return res.status(401).json({error: 'Too many failed attempts. Please wait half an hour until next login.'})
  }
};
async function signout(req, res)  {
  console.log('got to the end');
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only change to secure in production
    sameSite: 'lax',// do strict in production

    path: '/'
  });
  res.status(200).json({message: 'signout successfull!'});

}

export default {signup, signin, signout}
